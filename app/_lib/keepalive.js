import { supabase } from "./supabase";

// A tiny, silent keep-alive ping to the DB. This attempts an UPSERT using a
// stable `key` value so the table doesn't grow indefinitely. If the table
// doesn't have a `key` column (no unique constraint), we fall back to a
// SELECT and only INSERT when the table is empty. All errors are swallowed
// to avoid affecting the app.
export async function pingKeepAlive() {
  try {
    const now = new Date().toISOString();

    // Preferred: upsert on a unique `key` column so we only ever touch a
    // single row. This requires the `keep_alive` table to have a `key` column
    // with a unique constraint. Example SQL to create that variant:
    //
    // CREATE TABLE keep_alive (
    //   id bigserial primary key,
    //   key text UNIQUE,
    //   note text,
    //   created_at timestamptz default now(),
    //   updated_at timestamptz
    // );

    const upsertRow = {
      key: "keepalive_ping",
      note: "ping",
      updated_at: now,
      created_at: now,
    };

    try {
      const { data, error } = await supabase
        .from("keep_alive")
        .upsert([upsertRow], { onConflict: "key" })
        .select();

      if (error) {
        // If upsert fails because the `key` column doesn't exist or the
        // database doesn't support the conflict target, we'll fall back.
        const errMsg = (error && error.message) || String(error);
        // eslint-disable-next-line no-console
        console.debug("keepAlive upsert error:", errMsg);
        // Continue to fallback logic below.
      } else {
        return data;
      }
    } catch (upsertErr) {
      // eslint-disable-next-line no-console
      console.debug("keepAlive upsert exception:", upsertErr);
      // Continue to fallback logic below.
    }

    // Fallback: try to SELECT one row; only INSERT if table is empty. This
    // avoids blindly inserting a new row every time and keeps the operation
    // idempotent-ish even if the `key` column is absent.
    try {
      const { data: rows, error: selErr } = await supabase
        .from("keep_alive")
        .select("id")
        .limit(1);

      if (selErr) {
        // eslint-disable-next-line no-console
        console.debug("keepAlive select error:", selErr.message || selErr);
        return null;
      }

      if (rows && rows.length > 0) {
        // Table has at least one row already; nothing to do.
        return rows;
      }

      // Table empty — insert a single harmless row.
      const { data: insData, error: insErr } = await supabase
        .from("keep_alive")
        .insert([{ note: "ping", created_at: now }])
        .select();

      if (insErr) {
        // eslint-disable-next-line no-console
        console.debug(
          "keepAlive fallback insert error:",
          insErr.message || insErr
        );
        return null;
      }

      // After inserting, attempt to prune very old rows to avoid growth.
      try {
        const cutoff = new Date(
          Date.now() - 30 * 24 * 60 * 60 * 1000
        ).toISOString();
        await supabase.from("keep_alive").delete().lt("created_at", cutoff);
      } catch (pruneErr) {
        // eslint-disable-next-line no-console
        console.debug("keepAlive prune error:", pruneErr);
      }

      return insData;
    } catch (fallbackErr) {
      // eslint-disable-next-line no-console
      console.debug("keepAlive fallback exception:", fallbackErr);
      return null;
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.debug("keepAlive exception:", err);
    return null;
  }
}

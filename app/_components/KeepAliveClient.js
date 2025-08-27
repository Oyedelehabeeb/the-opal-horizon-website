"use client";

import { useEffect } from "react";

// Client-side component that calls the server endpoint. This avoids importing
// any server-only modules (like the Supabase client) into the client bundle.
export default function KeepAliveClient() {
  useEffect(() => {
    const callPing = async () => {
      try {
        // Fire the server endpoint; we don't care about the response body.
        await fetch("/api/keepalive", { method: "GET", cache: "no-store" });
      } catch (err) {
        // Debug only; never throw.
        // eslint-disable-next-line no-console
        console.debug("keepAlive client fetch error:", err);
      }
    };

    // Run once immediately
    callPing();

    // 72 hours in milliseconds
    const intervalMs = 72 * 60 * 60 * 1000;
    const id = setInterval(callPing, intervalMs);

    return () => clearInterval(id);
  }, []);

  return null;
}

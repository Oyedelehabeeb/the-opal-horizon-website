-- Keep-alive table for harmless pings to prevent Supabase project pause.
-- Preferred schema: single upsertable row using a unique `key` so the table
-- won't grow. We also include timestamps for pruning when desired.

-- Run this in your Supabase SQL editor.

CREATE TABLE IF NOT EXISTS public.keep_alive (
  id bigserial PRIMARY KEY,
  key text UNIQUE,
  note text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz
);

-- Optional index to help pruning queries
CREATE INDEX IF NOT EXISTS idx_keep_alive_created_at ON public.keep_alive (created_at);

-- Alternative: if you prefer UUID primary keys
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- CREATE TABLE IF NOT EXISTS public.keep_alive (
--   id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
--   key text UNIQUE,
--   note text,
--   created_at timestamptz DEFAULT now(),
--   updated_at timestamptz
-- );

-- Note: The application will attempt to upsert on `key = 'keepalive_ping'`.
-- It will also prune rows older than 30 days. If you prefer a different
-- retention window, change the pruning logic in `app/_lib/keepalive.js`.

-- scripts/migrations/create_feedback_table.sql
-- Togthr Feedback System (K3 8/3)
-- Run this on the Supabase SQL Editor or via CLI: psql <DATABASE_URL> -f scripts/migrations/create_feedback_table.sql

-- 1. Create enum
CREATE TYPE feedback_status AS ENUM ('pending', 'sent', 'failed');

-- 2. Create table
CREATE TABLE IF NOT EXISTS feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT,
  type TEXT NOT NULL,
  message TEXT NOT NULL,
  status feedback_status NOT NULL DEFAULT 'pending',
  turnstile_verified BOOLEAN NOT NULL DEFAULT FALSE,
  resend_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. Index for admin queries
CREATE INDEX IF NOT EXISTS idx_feedback_created_at ON feedback (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_feedback_status    ON feedback (status);

-- 4. Enable RLS (safe default: no public access — only API service_role key touches this table)
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

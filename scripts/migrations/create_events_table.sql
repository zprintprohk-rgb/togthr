-- scripts/migrations/create_events_table.sql
-- Togthr F1–F4 T1 Features (K3 Phase 6, 2026-08-06)
-- PRD approved by 唐总. Run on Supabase SQL Editor.

-- 1. Events table (power F1 Trace Stream + F2 Signals + F3 Streak + F4 Email)
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  couple_id UUID NOT NULL REFERENCES couples(id) ON DELETE CASCADE,
  actor_id UUID NOT NULL REFERENCES profiles(id),
  event_type TEXT NOT NULL CHECK (event_type IN ('feed', 'touch', 'signal')),
  metadata JSONB DEFAULT '{}'::jsonb,  -- eg. { "signal_type": "hug", "streak_count": 7 }
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_events_couple_id ON events (couple_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_events_actor_id ON events (actor_id);

-- 2. RLS: couple-scoped read (both partners can see their shared events)
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Policy: select only events belonging to your couple
CREATE POLICY events_couple_read ON events
  FOR SELECT
  USING (
    couple_id IN (
      SELECT id FROM couples WHERE user1_id = auth.uid() OR user2_id = auth.uid()
    )
  );

-- Policy: insert only by member of the couple
CREATE POLICY events_couple_insert ON events
  FOR INSERT
  WITH CHECK (
    couple_id IN (
      SELECT id FROM couples WHERE user1_id = auth.uid() OR user2_id = auth.uid()
    )
    AND actor_id = auth.uid()
  );

-- 3. Streak tracking (per-couple, for F3)
CREATE TABLE IF NOT EXISTS streaks (
  couple_id UUID PRIMARY KEY REFERENCES couples(id) ON DELETE CASCADE,
  current_count INTEGER NOT NULL DEFAULT 0,
  last_active_date DATE,
  is_frozen BOOLEAN NOT NULL DEFAULT FALSE,  -- "sleepy" state
  frozen_since TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE streaks ENABLE ROW LEVEL SECURITY;

CREATE POLICY streaks_couple_read ON streaks
  FOR SELECT
  USING (
    couple_id IN (
      SELECT id FROM couples WHERE user1_id = auth.uid() OR user2_id = auth.uid()
    )
  );

-- 4. Email tracking (for F4 bid notification frequency control)
CREATE TABLE IF NOT EXISTS email_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient_id UUID NOT NULL REFERENCES profiles(id),
  event_id UUID NOT NULL REFERENCES events(id),
  sent_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_email_log_recipient ON email_log (recipient_id, sent_at DESC);

-- 5. Test: verify non-couple user cannot read events
-- After migration, run:
-- SELECT count(*) FROM events WHERE couple_id = '<some-couple-id>';
-- As a user NOT in that couple, this should return 0 due to RLS.

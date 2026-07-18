-- ============================================
-- Focus Mode — 专注模式（番茄钟 + 像素公仔陪伴）
-- docs/focus-mode-spec.md §3
--
-- 手动执行：Supabase Dashboard → SQL Editor → 粘贴运行
-- 说明：无外键（同 supabase-init.sql 风格，user_id 直接存 auth.users.id）
-- ============================================

CREATE TABLE IF NOT EXISTS "focus_sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"planned_minutes" integer NOT NULL,
	"actual_seconds" integer DEFAULT 0 NOT NULL,
	"status" text DEFAULT 'active' NOT NULL,
	"interruptions" integer DEFAULT 0 NOT NULL,
	"started_at" timestamptz DEFAULT now() NOT NULL,
	"ended_at" timestamptz,
	"created_at" timestamptz DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "focus_streaks" (
	"user_id" uuid PRIMARY KEY NOT NULL,
	"current_streak" integer DEFAULT 0 NOT NULL,
	"longest_streak" integer DEFAULT 0 NOT NULL,
	"last_completed_date" date,
	"total_minutes" integer DEFAULT 0 NOT NULL,
	"total_beans" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "focus_sessions_user_id_idx" ON "focus_sessions" USING btree ("user_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "focus_sessions_status_idx" ON "focus_sessions" USING btree ("status");
--> statement-breakpoint

-- grants：anon 只读，authenticated 全权限，service_role 全部
GRANT SELECT ON "focus_sessions" TO anon;
GRANT ALL ON "focus_sessions" TO authenticated;
GRANT ALL ON "focus_sessions" TO service_role;
--> statement-breakpoint
GRANT SELECT ON "focus_streaks" TO anon;
GRANT ALL ON "focus_streaks" TO authenticated;
GRANT ALL ON "focus_streaks" TO service_role;
--> statement-breakpoint

-- 让 PostgREST 立刻看到新表
NOTIFY pgrst, 'reload schema';

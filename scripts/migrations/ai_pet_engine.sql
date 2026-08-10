-- S4 ENGINE 数据库迁移：AI 宠物引擎所需表
-- 在 Supabase SQL Editor 执行一次

-- 1. 长期记忆表（memory/engine.ts 使用）
create table if not exists pet_memories (
  id uuid primary key default gen_random_uuid(),
  pet_id text not null,
  content text not null,
  kind text not null default 'conversation',
  created_at timestamptz not null default now()
);
create index if not exists pet_memories_pet_idx on pet_memories (pet_id, created_at desc);

-- 2. 对话日志表（运营台账：配额使用、回复延迟、模式）
create table if not exists pet_chat_logs (
  id uuid primary key default gen_random_uuid(),
  pet_id text not null,
  user_message text not null,
  reply text not null,
  latency_ms integer not null default 0,
  mode text not null default 'mock',
  used_quota integer not null default 0,
  quota_limit integer not null default 5,
  created_at timestamptz not null default now()
);
create index if not exists pet_chat_logs_pet_idx on pet_chat_logs (pet_id, created_at desc);

CREATE TABLE "albums" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"couple_id" uuid NOT NULL,
	"name" text NOT NULL,
	"is_private" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "capsules" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"couple_id" uuid,
	"title" text NOT NULL,
	"content" text NOT NULL,
	"unlock_date" timestamp NOT NULL,
	"is_locked" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "challenge_participants" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"challenge_id" uuid NOT NULL,
	"couple_id" uuid NOT NULL,
	"completed_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "challenges" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"reward_points" integer DEFAULT 0 NOT NULL,
	"start_date" timestamp,
	"end_date" timestamp
);
--> statement-breakpoint
CREATE TABLE "comments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"post_id" uuid NOT NULL,
	"author_id" uuid NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "couples" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user1_id" uuid NOT NULL,
	"user2_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "likes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"post_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "likes_post_id_user_id_pk" PRIMARY KEY("post_id","user_id")
);
--> statement-breakpoint
CREATE TABLE "memberships" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"tier" text NOT NULL,
	"status" text DEFAULT 'active' NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"expires_at" timestamp NOT NULL,
	CONSTRAINT "memberships_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"user_email" text,
	"gateway" text NOT NULL,
	"payment_id" text,
	"amount" integer NOT NULL,
	"currency" text NOT NULL,
	"tier" text NOT NULL,
	"period" text NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"gateway_raw" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"paid_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "pets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"couple_id" uuid NOT NULL,
	"name" text NOT NULL,
	"level" integer DEFAULT 1 NOT NULL,
	"happiness" integer DEFAULT 70 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "posts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"author_id" uuid NOT NULL,
	"couple_id" uuid NOT NULL,
	"type" text NOT NULL,
	"content" text NOT NULL,
	"images" text[],
	"is_anonymous" boolean DEFAULT false NOT NULL,
	"status" text DEFAULT 'published' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "profiles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"auth_uid" uuid NOT NULL,
	"email" text NOT NULL,
	"display_name" text,
	"avatar_url" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "profiles_auth_uid_unique" UNIQUE("auth_uid")
);
--> statement-breakpoint
CREATE TABLE "push_subscriptions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"endpoint" text NOT NULL,
	"p256dh" text NOT NULL,
	"auth" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "push_subscriptions_endpoint_unique" UNIQUE("endpoint")
);
--> statement-breakpoint
CREATE TABLE "referrals" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"inviter_id" uuid NOT NULL,
	"invitee_id" uuid NOT NULL,
	"code" text NOT NULL,
	"status" text DEFAULT 'invited' NOT NULL,
	"reward_claimed" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tickets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"type" text NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"status" text DEFAULT 'open' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "topics" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"description" text,
	"post_count" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "topics_name_unique" UNIQUE("name"),
	CONSTRAINT "topics_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "albums" ADD CONSTRAINT "albums_couple_id_couples_id_fk" FOREIGN KEY ("couple_id") REFERENCES "public"."couples"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "capsules" ADD CONSTRAINT "capsules_user_id_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "capsules" ADD CONSTRAINT "capsules_couple_id_couples_id_fk" FOREIGN KEY ("couple_id") REFERENCES "public"."couples"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "challenge_participants" ADD CONSTRAINT "challenge_participants_challenge_id_challenges_id_fk" FOREIGN KEY ("challenge_id") REFERENCES "public"."challenges"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "challenge_participants" ADD CONSTRAINT "challenge_participants_couple_id_couples_id_fk" FOREIGN KEY ("couple_id") REFERENCES "public"."couples"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comments" ADD CONSTRAINT "comments_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comments" ADD CONSTRAINT "comments_author_id_profiles_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "couples" ADD CONSTRAINT "couples_user1_id_profiles_id_fk" FOREIGN KEY ("user1_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "couples" ADD CONSTRAINT "couples_user2_id_profiles_id_fk" FOREIGN KEY ("user2_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "likes" ADD CONSTRAINT "likes_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "likes" ADD CONSTRAINT "likes_user_id_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "memberships" ADD CONSTRAINT "memberships_user_id_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pets" ADD CONSTRAINT "pets_couple_id_couples_id_fk" FOREIGN KEY ("couple_id") REFERENCES "public"."couples"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_author_id_profiles_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_couple_id_couples_id_fk" FOREIGN KEY ("couple_id") REFERENCES "public"."couples"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "push_subscriptions" ADD CONSTRAINT "push_subscriptions_user_id_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "referrals" ADD CONSTRAINT "referrals_inviter_id_profiles_id_fk" FOREIGN KEY ("inviter_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "referrals" ADD CONSTRAINT "referrals_invitee_id_profiles_id_fk" FOREIGN KEY ("invitee_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_user_id_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "orders_user_id_idx" ON "orders" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "orders_payment_id_idx" ON "orders" USING btree ("payment_id");--> statement-breakpoint
CREATE INDEX "orders_status_idx" ON "orders" USING btree ("status");
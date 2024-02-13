CREATE TABLE IF NOT EXISTS "whiteboard_files" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp,
	"title" text NOT NULL,
	"icon_id" text NOT NULL,
	"data" text,
	"in_trash" text,
	"banner_url" text,
	"workspace_id" uuid NOT NULL,
	"folder_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "whiteboard_folders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp,
	"title" text NOT NULL,
	"icon_id" text NOT NULL,
	"data" text,
	"in_trash" text,
	"banner_url" text,
	"workspace_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "whiteboard_workspaces" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp,
	"workspace_owner" uuid NOT NULL,
	"title" text NOT NULL,
	"icon_id" text NOT NULL,
	"data" text,
	"in_trash" text,
	"logo" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "whiteboard_files" ADD CONSTRAINT "whiteboard_files_workspace_id_whiteboard_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "whiteboard_workspaces"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "whiteboard_files" ADD CONSTRAINT "whiteboard_files_folder_id_whiteboard_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "whiteboard_folders"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "whiteboard_folders" ADD CONSTRAINT "whiteboard_folders_workspace_id_whiteboard_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "whiteboard_workspaces"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

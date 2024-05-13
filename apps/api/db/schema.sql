CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`created_at` text DEFAULT (DATETIME('now', 'localtime')),
	`updated_at` text,
	`deleted_at` text
);

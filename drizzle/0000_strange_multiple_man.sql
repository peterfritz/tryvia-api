CREATE TABLE `questions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` text,
	`type` text NOT NULL,
	`category` text NOT NULL,
	`difficulty` text NOT NULL,
	`question` text NOT NULL,
	`correct_answer` text NOT NULL,
	`incorrect_answers` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `questions_type_index` ON `questions` (`type`);--> statement-breakpoint
CREATE INDEX `questions_category_index` ON `questions` (`category`);--> statement-breakpoint
CREATE INDEX `questions_difficulty_index` ON `questions` (`difficulty`);
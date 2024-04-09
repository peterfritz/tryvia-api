import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { categories, difficulties, types } from "../../data/settings";

export const questions = sqliteTable(
  "questions",
  {
    id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    createdAt: text("created_at").$defaultFn(() => new Date().toISOString()),
    type: text("type", { enum: types }).notNull(),
    category: text("category", {
      enum: categories.map((category) => category.name) as [
        string,
        ...string[],
      ],
    }).notNull(),
    difficulty: text("difficulty", {
      enum: difficulties,
    }).notNull(),
    question: text("question").notNull(),
    correctAnswer: text("correct_answer").notNull(),
    incorrectAnswers: text("incorrect_answers", { mode: "json" })
      .notNull()
      .$type<[string] | [string, string, string]>(),
  },
  (table) => ({
    typeIndex: index("questions_type_index").on(table.type),
    categoryIndex: index("questions_category_index").on(table.category),
    difficultyIndex: index("questions_difficulty_index").on(table.difficulty),
  })
);

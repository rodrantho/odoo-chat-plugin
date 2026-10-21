import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
export const connections = sqliteTable('user_connections', {
  userId: text('user_id').primaryKey(),
  ciphertext: text('ciphertext').notNull(),
  iv: text('iv').notNull(),
  updatedAt: text('updated_at').notNull()
});

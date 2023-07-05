import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable("departments", (table) => {
      table.increments("dept_id").primary().notNullable();
      table.string("name").unique().notNullable();
      table
        .integer("org_id")
        .notNullable()
        .unsigned()
        .references("org_id")
        .inTable("organisations");
      table.timestamps(true, true);
      table.timestamp("deleted_at").nullable();
    })
    .then(() =>
      knex.schema.alterTable("users", (table) => {
        table.dropColumn("dept_id");
      })
    )
    .then(() =>
      knex.schema.alterTable("users", (table) => {
        table
          .integer("dept_id")
          .unsigned()
          .references("dept_id")
          .inTable("departments");
      })
    );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .alterTable("users", (table) => {
      table.dropColumn("dept_id");
    })
    .then(() => knex.schema.dropTable("departments"));
}

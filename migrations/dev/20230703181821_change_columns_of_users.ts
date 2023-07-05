import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .alterTable("users", (table) => {
      table.dropColumn("role_id");
      table.dropColumn("dept_id");
    })
    .then(() =>
      knex.schema.alterTable("users", (table) => {
        table
          .integer("role_id")
          .notNullable()
          .unsigned()
          .references("role_id")
          .inTable("roles");
        table
          .integer("dept_id")
          .unsigned()
          .references("dept_id")
          .inTable("departments");
      })
    );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("users", (table) => {
    table.dropColumn("role_id");
    table.dropColumn("dept_id");
  });
}

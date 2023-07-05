import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .alterTable("roles", (table) => {
      table
        .integer("dept_id")
        .notNullable()
        .unsigned()
        .references("dept_id")
        .inTable("departments");
      table.dropColumn("org_id");
    })
    .then(() =>
      knex.schema.alterTable("roles", (table) => {
        table
          .integer("org_id")
          .notNullable()
          .unsigned()
          .references("org_id")
          .inTable("organisations");
      })
    );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("roles", (table) => {
    table.dropColumn("dept_id");
  });
}

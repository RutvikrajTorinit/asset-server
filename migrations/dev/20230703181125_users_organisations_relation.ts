import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .alterTable("users", (table) => {
      table.dropColumn("org_id");
    })
    .then(() =>
      knex.schema.alterTable("users", (table) => {
        table
          .integer("org_id")
          .nullable()
          .unsigned()
          .references("org_id")
          .inTable("organisations");
      })
    );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("users", (table) => {
    table.dropColumn("org_id");
  });
}

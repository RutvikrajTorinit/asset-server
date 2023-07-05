import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .alterTable("assets", (table) => {
      table.dropColumn("status");
    })
    .then(() =>
      knex.schema.alterTable("assets", (table) => {
        table
          .integer("status")
          .notNullable()
          .defaultTo(1)
          .unsigned()
          .references("status_id")
          .inTable("asset_statuses");
      })
    );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("assets", (table) => {
    table.dropColumn("status");
  });
}

import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable("asset_statuses", (table) => {
      table.increments("status_id").primary().notNullable();
      table
        .enum("status", ["available", "allocated", "under_maintenance"])
        .notNullable();
    })
    .then(() =>
      knex.schema.alterTable("assets", (table) => {
        table.dropColumn("status");
      })
    )
    .then(() =>
      knex.schema.alterTable("assets", (table) => {
        table
          .integer("status")
          .notNullable()
          .unsigned()
          .references("status_id")
          .inTable("asset_statuses");
      })
    );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("asset_statuses");
}

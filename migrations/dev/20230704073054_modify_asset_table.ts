import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .alterTable("assets", (table) => {
      table
        .integer("org_id")
        .notNullable()
        .unsigned()
        .references("org_id")
        .inTable("organisations");
      table.dropColumn("assigned_to");
    })
    .then(() =>
      knex.schema.alterTable("assets", (table) => {
        table
          .integer("assigned_to")
          .nullable()
          .unsigned()
          .references("user_id")
          .inTable("users");
      })
    );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("assets", (table) => {
    table.dropColumn("org_id");
  });
}

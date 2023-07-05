import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable("roles", (table) => {
      table.increments("role_id").primary().notNullable();
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
        table.dropColumn("role_id");
      })
    )
    .then(() =>
      knex.schema.alterTable("users", (table) => {
        table
          .integer("role_id")
          .unsigned()
          .references("role_id")
          .inTable("roles");
      })
    );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .alterTable("users", (table) => {
      table.dropColumn("role_id");
    })
    .then(() => knex.schema.dropTable("roles"));
}

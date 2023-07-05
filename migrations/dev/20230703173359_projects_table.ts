import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable("projects", (table) => {
      table.increments("proj_id").primary().notNullable();
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
        table.dropColumn("proj_id");
      })
    )
    .then(() =>
      knex.schema.alterTable("users", (table) => {
        table
          .integer("proj_id")
          .unsigned()
          .references("proj_id")
          .inTable("projects");
      })
    );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .alterTable("users", (table) => {
      table.dropColumn("proj_id");
    })
    .then(() => knex.schema.dropTable("projects"));
}

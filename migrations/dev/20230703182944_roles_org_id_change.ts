import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .alterTable("roles", (table) => {
      table.dropColumn("org_id");
      table.dropColumn("dept_id");
      table.dropColumn("deleted_at");
    })
    .then(() =>
      knex.schema.alterTable("roles", (table) => {
        table
          .integer("org_id")
          .nullable()
          .unsigned()
          .references("org_id")
          .inTable("organisations");
        table
          .integer("dept_id")
          .nullable()
          .unsigned()
          .references("dept_id")
          .inTable("departments");
        table.timestamp("deleted_at").nullable();
      })
    );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("roles", (table) => {
    table.dropColumn("org_id");
  });
}

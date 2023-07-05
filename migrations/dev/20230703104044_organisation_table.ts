import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("organisations", (table) => {
    table.increments("org_id").notNullable().primary();
    table.string("name").notNullable();
    table.string("address").notNullable();
    table.string("city").notNullable();
    table.string("state").notNullable();
    table.string("country").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
    table.timestamp("updated_at").defaultTo(knex.fn.now()).notNullable();
    table.timestamp("deleted_at").nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("organisations");
}

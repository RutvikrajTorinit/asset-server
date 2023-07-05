import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("assets", (table) => {
    table.increments("asset_id").primary().notNullable();
    table.string("asset_name").notNullable();
    table.string("asset_type").notNullable();
    table.date("purchase_date").notNullable();
    table.decimal("purchase_cost", 10, 2).notNullable();
    table.string("location").notNullable();
    table.string("status").notNullable();
    table.bigint("assigned_to").nullable();
    table.timestamps(true, true);
    table.timestamp("deleted_at").nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("assets");
}

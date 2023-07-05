import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("users", (table) => {
    table.increments("user_id").notNullable().primary();
    table.string("first_name").notNullable();
    table.string("last_name").notNullable();
    table.string("password").notNullable();
    table.string("email").unique().notNullable();
    table.string("contact_no").nullable();
    table.bigint("org_id").nullable();
    table.bigint("role_id").notNullable();
    table.bigint("proj_id").nullable();
    table.bigint("dept_id").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
    table.timestamp("updated_at").defaultTo(knex.fn.now()).notNullable();
    table.timestamp("deleted_at").nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("users");
}

import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("audits", (table) => {
    table.increments("audit_id").primary().notNullable();
    table.string("req_url");
    table.string("req_method");
    table.string("message");
    table.string("module");
    table.string("user_id");
    table.string("req_host");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("audits");
}

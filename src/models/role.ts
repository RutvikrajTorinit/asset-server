import { Model } from "objection";
import User from "./user";
import Organisation from "./organisation";
import Department from "./department";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const knex = require("../../knex");

Model.knex(knex);

class Role extends Model {
  name!: string;
  org_id!: number;
  dept_id!: number;
  created_at!: Date;
  updated_at!: Date;
  deleted_at!: Date;

  static get tableName() {
    return "roles";
  }

  static get idColumn() {
    return "role_id";
  }

  $beforeInsert(): void | Promise<any> {
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  $beforeUpdate(): void | Promise<any> {
    this.updated_at = new Date();
  }

  $beforeDelete(): void | Promise<any> {
    this.deleted_at = new Date();
  }

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        role_id: { type: "integer" },
        dept_id: { type: "integer" },
        name: { type: "string" },
        org_id: { type: "integer" }
      }
    };
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.HasManyRelation,
        modelClass: User,
        join: {
          from: "roles.role_id",
          to: "users.role_id"
        }
      },
      organisation: {
        relation: Model.BelongsToOneRelation,
        modelClass: Organisation,
        join: {
          from: "roles.org_id",
          to: "organisations.org_id"
        }
      },
      department: {
        relation: Model.BelongsToOneRelation,
        modelClass: Department,
        join: {
          from: "role.dept_id",
          to: "departments.dept_id"
        }
      }
    };
  }
}

export default Role;

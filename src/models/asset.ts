import { Model } from "objection";
import User from "./user";
import Organisation from "./organisation";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const knex = require("../../knex");

Model.knex(knex);

class Asset extends Model {
  asset_name!: string;
  asset_type!: string;
  purchase_date!: Date;
  purchase_cost!: string | number;
  location!: string;
  status!: string | number;
  assigned_to!: number;
  org_id!: number;
  created_at!: Date;
  updated_at!: Date;
  deleted_at!: Date;

  static get tableName() {
    return "assets";
  }

  static get idColumn() {
    return "asset_id";
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
        asset_id: { type: "integer" },
        assed_name: { type: "string" },
        asset_type: { type: "string" },
        // purchase_date: { type: "date" },
        location: { type: "string" },
        status: { type: "integer" },
        org_id: { type: "integer" },
        purchase_cost: { type: "integer" }
      }
    };
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "assets.assigned_to",
          to: "users.user_id"
        }
      },
      organisation: {
        relation: Model.BelongsToOneRelation,
        modelClass: Organisation,
        join: {
          from: "assets.org_id",
          to: "organisations.org_id"
        }
      }
    };
  }
}

export default Asset;

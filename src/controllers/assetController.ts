import { Response } from "express";
import { CustomRequest, ReqQuery, RequestUser } from "../types/extendedTypes";
import logError from "../db/audit";
import httpStatusCode from "../utils/httpStatusCode";
import Organisation from "../models/organisation";
import Asset from "../models/asset";
import createQuery from "../helper/queryBuilder";
import { fn, ref } from "objection";

export const createAsset = async (req: CustomRequest, res: Response) => {
  try {
    const {
      body,
      user
    }: {
      body: {
        assetName: string;
        assetType: string;
        purchaseDate: Date;
        purchaseCost: string | number;
        location: string;
      };
      user?: RequestUser;
    } = req;

    const existingOrg = Organisation.query()
      .findById(user?.org_id || 1)
      .where({
        deleted_at: null
      });

    if (!existingOrg) {
      return res.sendStatus(httpStatusCode.NO_CONTENT);
    }

    const { assetName, assetType, location, purchaseCost, purchaseDate } = body;

    await Asset.query().insert({
      asset_name: assetName,
      asset_type: assetType,
      location: location,
      purchase_cost: purchaseCost,
      purchase_date: new Date(purchaseDate),
      org_id: user?.org_id || 1
      //   status: 1
    });

    return res.sendStatus(httpStatusCode.CREATED);
  } catch (error: any) {
    await logError({
      message: error.message,
      module: "getOrganisations",
      req_url: req.originalUrl,
      req_method: req.method,
      req_host: req.headers["host"],
      user_id: req.user?.user_id
    });

    return res
      .status(error.code || httpStatusCode.SERVER_ERROR)
      .json({ error: error.message });
  }
};

export const getAllAssets = async (req: CustomRequest, res: Response) => {
  try {
    const { query }: { query: ReqQuery } = req;
    const {
      page,
      per_page,
      sort_by = "created_at",
      sort_order = "asc",
      search,
      search_field
    } = query;

    const getAllAssetsQuery = Asset.query()
      .leftJoin("asset_statuses", "assets.status", "asset_statuses.status_id")
      .leftJoinRelated("organisation")
      .leftJoinRelated("user")
      .where("assets.deleted_at", null);

    const newQuery = createQuery({
      query: getAllAssetsQuery,
      page: Number(page),
      per_page: Number(per_page),
      search: search!,
      search_field: search_field!,
      sort_by: sort_by,
      sort_order: sort_order
    });

    const assets: any = await newQuery.select(
      "assets.asset_name",
      "assets.asset_type",
      "assets.purchase_date",
      "assets.purchase_cost",
      "assets.location",
      "assets.created_at",
      "organisation.name as organisation",
      fn
        .concat(ref("user.first_name"), ref("user.last_name"))
        .as("assigned_to"),
      "asset_statuses.status as status"
    );

    if (page) {
      const { results, total } = assets;

      return res.status(httpStatusCode.SUCCESS).json({
        data: results,
        total: total
      });
    }

    return res
      .status(httpStatusCode.SUCCESS)
      .json({ data: assets, total: assets.length });
  } catch (error: any) {
    await logError({
      message: error.message,
      module: "getUsers",
      req_url: req.originalUrl,
      req_method: req.method,
      req_host: req.headers["host"],
      user_id: req.user?.user_id
    });

    return res
      .status(error.code || httpStatusCode.SERVER_ERROR)
      .json({ error: error.message });
  }
};

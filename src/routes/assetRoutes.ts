import { Router } from "express";
import { createAsset, getAllAssets } from "../controllers/assetController";

const router = Router();

router.post("/", createAsset);
router.get("/", getAllAssets);

export default router;

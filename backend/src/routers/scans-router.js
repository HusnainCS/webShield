import express from "express";
// import { generateScanReport } from "../utils/pdf-generator.js";
import { checkAuth } from "../middlewares/user-auth.js";
import { Scan } from "../models/scans-mongoose.js";
import {
  startScan,
  getScanHistory,
  getScanResults,
  removeScan,
  upgradeUserScan,
  cancelScan,
  getAllScanHistory,
  getUserScanHistoryAdmin,
} from "../controllers/scan-controller.js";
import { checkAdmin } from "../middlewares/admin-auth.js";
import { htmlToPdf } from "../utils/htmlToPdf.js";
import { scanWithNmap } from "../utils/scanners/nmap-scanner.js";
const scanRouter = express.Router();

scanRouter.use(checkAuth);
scanRouter.post("/start", startScan);
scanRouter.get("/history", getScanHistory);
scanRouter.get("/:id", getScanResults);
scanRouter.delete("/:id", checkAdmin, removeScan);
scanRouter.post("/:id/cancel", cancelScan);

export default scanRouter;

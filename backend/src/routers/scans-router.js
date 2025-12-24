import express from "express";
import { checkAuth } from "../middlewares/user-auth.js";

import {
  startScan,
  getScanHistory,
  getScanResultsById,
  cancelScan,
} from "../controllers/user-scan-controller.js";
import { generateAIReportForScan } from "../controllers/aiReport-controller.js";

const scanRouter = express.Router();
scanRouter.use(checkAuth);

scanRouter.post("/start", startScan);
scanRouter.get("/history", getScanHistory);
scanRouter.get("/:id", getScanResultsById);
scanRouter.post("/:id/cancel", cancelScan);
scanRouter.get("/:id/report",generateAIReportForScan);

export default scanRouter;

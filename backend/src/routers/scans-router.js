import express from "express";
// import { generateScanReport } from "../utils/pdf-generator.js";
import { checkAuth } from "../middlewares/auth.js";
import { Scan } from "../models/scans-mongo.js";
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
scanRouter.post("/admin/update-limit", checkAdmin, upgradeUserScan);
scanRouter.post("/:id/cancel", cancelScan);
scanRouter.get("/admin/history", checkAdmin, getAllScanHistory);
scanRouter.get(
  "/admin/user/:userId/history",
  checkAdmin,
  getUserScanHistoryAdmin
);

scanRouter.get("/:id/report", async (req, res) => {
  try {
    const scan = await Scan.findById(req.params.id);

    if (!scan || scan.scanType !== "nmap") {
      return res.status(400).json({ error: "Nmap scan required" });
    }

    // Run scan again just for demo (later: store result)
    const nmapResult = await scanWithNmap(scan.targetUrl);

    if (!nmapResult.success) {
      return res.status(500).json({ error: "Nmap scan failed" });
    }

    const pdf = await htmlToPdf(nmapResult.htmlReport);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=nmap-report.pdf"
    );

    res.send(pdf);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
export default scanRouter;

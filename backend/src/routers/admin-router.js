import express from 'express'; 
import { checkAdmin } from '../middlewares/admin-auth.js';
import { checkAuth } from '../middlewares/user-auth.js';
import { removeScan,upgradeUserScan,getAllScanHistory,getUserScanHistoryAdmin } from '../controllers/scan-controller.js';

const adminRouter = express.Router();

adminRouter.get("/", checkAuth, checkAdmin, (req, res) => {
  res.json({
    message: "Welcome Admin",
    user: req.user,
  });
});
adminRouter.delete("/:id", checkAdmin, removeScan);
adminRouter.post("/update-limit", checkAdmin, upgradeUserScan);
adminRouter.get("/history", checkAdmin, getAllScanHistory);
adminRouter.get("/:userId/history",checkAdmin,getUserScanHistoryAdmin);

export default adminRouter;


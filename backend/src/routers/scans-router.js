import express from "express";
import { checkAuth } from "../middlewares/auth.js";
import { 
    startScan, 
    getScanHistory, 
    getScanResults, 
    removeScan 
} from "../controllers/scan-controller.js"; 

const scanRouter = express.Router();

scanRouter.use(checkAuth);
scanRouter.post("/start", startScan); 
scanRouter.get("/history", getScanHistory); 

scanRouter.get("/:id", getScanResults); 
scanRouter.delete("/:id", removeScan); 


scanRouter.get("/:id/report", async (req,res) => {
    try {
        const scanId = req.params.id;
        res.json({
            message: `PDF report for scan ${scanId}`,
            reportUrl: "/reports/scan-123.pdf"
        });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

export default scanRouter;
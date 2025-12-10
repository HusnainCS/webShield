import express from 'express';
import { checkAuth } from '../middlewares/auth.js';
import {
    getUserSkipfishReports,
    getSkipfishReport,
    getSkipfishReportInfo
} from '../controllers/skipfish-controller.js';

const skipfishRouter = express.Router();

// All routes require authentication
skipfishRouter.use(checkAuth);

// Get all user's Skipfish reports
skipfishRouter.get('/reports', getUserSkipfishReports);

// Get report info (without HTML)
skipfishRouter.get('/report/:id', getSkipfishReportInfo);

// Download full HTML report
skipfishRouter.get('/report/:id/download', getSkipfishReport);

export default skipfishRouter;
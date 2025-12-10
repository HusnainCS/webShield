import { SkipfishReport } from '../models/skipfish-reports.js';

/**
 * Get all Skipfish reports for a user
 */
export async function getUserSkipfishReports(req, res) {
    try {
        const userId = req.user.userId;
        
        const reports = await SkipfishReport.find({ userId: userId })
            .sort({ createdAt: -1 })
            .select('scanId targetUrl fileSize createdAt')
            .limit(50);
        
        res.json({
            success: true,
            total: reports.length,
            reports: reports
        });
        
    } catch (error) {
        console.error('Get Skipfish reports error:', error);
        res.status(500).json({
            success: false,
            error: "Failed to fetch Skipfish reports"
        });
    }
}

/**
 * Get specific Skipfish report HTML
 */
export async function getSkipfishReport(req, res) {
    try {
        const reportId = req.params.id;
        const userId = req.user.userId;
        
        const report = await SkipfishReport.findOne({
            _id: reportId,
            userId: userId
        });
        
        if (!report) {
            return res.status(404).json({
                success: false,
                error: "Skipfish report not found"
            });
        }
        
        // Return as downloadable HTML file
        res.setHeader('Content-Type', 'text/html');
        res.setHeader('Content-Disposition', `attachment; filename="skipfish-report-${reportId}.html"`);
        res.send(report.htmlContent);
        
    } catch (error) {
        console.error('Get Skipfish report error:', error);
        res.status(500).json({
            success: false,
            error: "Failed to fetch Skipfish report"
        });
    }
}

/**
 * Get Skipfish report info (without full HTML)
 */
export async function getSkipfishReportInfo(req, res) {
    try {
        const reportId = req.params.id;
        const userId = req.user.userId;
        
        const report = await SkipfishReport.findOne({
            _id: reportId,
            userId: userId
        }).select('-htmlContent'); // Exclude the large HTML field
        
        if (!report) {
            return res.status(404).json({
                success: false,
                error: "Skipfish report not found"
            });
        }
        
        res.json({
            success: true,
            report: {
                id: report._id,
                scanId: report.scanId,
                targetUrl: report.targetUrl,
                fileSize: report.fileSize,
                sizeKB: Math.round(report.fileSize / 1024),
                generatedAt: report.generatedAt,
                downloadUrl: `/api/skipfish/${report._id}/download`
            }
        });
        
    } catch (error) {
        console.error('Get Skipfish info error:', error);
        res.status(500).json({
            success: false,
            error: "Failed to fetch Skipfish report info"
        });
    }
}
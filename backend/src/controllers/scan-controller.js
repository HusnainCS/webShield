import { createScan, deleteScan, scanById, updateScanResult, userScanHistory } from "../models/scans-model.js";
import { Scan } from "../models/scans-mongo.js";
import { scanWithGobuster } from "../utils/scanners/gobuster-scanner.js";
import { scanWithNmap } from "../utils/scanners/nmap-scanner.js";
import { scanWithSkipfish } from "../utils/scanners/skipFish-scanner.js";
import { scanWithSsl } from "../utils/scanners/ssl-scanner.js";
import { urlValidation } from "../utils/validations/url-validation.js";

export async function startScan(req,res) {
    try {
        const {targetUrl, scanType} = req.body;
        const userId = req.user.userId;

        const validation = urlValidation(targetUrl);
        if(!validation.valid){
            return res.status(400).json({error : validation.error})
        }

        const scanData = {
            userId : userId,
            targetUrl : validation.url, 
            scanType : scanType || "full",
            status  : "running"
        };

        const result = await createScan(scanData);
        res.json({
            message : "Scan started Successfully",
            scanId : result._id,
            status : "running",
            scanType : scanType
        });
        try {
            let nmapresult = {};
            let sslResult = [];
            let gobusterResult = [];
            let skipfishResult = [];


            if(scanType === 'nmap' || scanType === 'full'){
            console.log(`Starting Nmap scan for ${validation.url}`);
            nmapresult = await scanWithNmap(validation.url);
            } if(scanType === 'skipfish' || scanType === 'full'){
            console.log(`Starting skipfish scan for ${validation.url}`);
            skipfishResult = await scanWithSkipfish(validation.url);
            }if(scanType == 'ssl' || scanType === 'full'){
                console.log(`Staring SSL Scan for: ${validation.url}`);
                sslResult = await scanWithSsl(validation.url);
            }if(scanType == 'gobuster' || scanType === 'full'){
                console.log(`Staring Gobuster Scan for: ${validation.url}`);
                gobusterResult = await scanWithGobuster(validation.url);
            }

            await updateScanResult(result._id, {
                nmap : nmapresult,
                ssl : sslResult,
                gobuster : gobusterResult,
                skipfish : skipfishResult
        
            });
            console.log(`Scan ${result._id} completed with results`);
            } catch (scanError){
                await Scan.findByIdAndUpdate(result._id, {
                    status : "failed",
                    results : {error : scanError.message}
                })
            }

    }catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export async function getScanHistory(req, res) {
    try {
        const userId = req.user.userId;
        const scans = await userScanHistory(userId);
        

        const cleanScans = scans.map(scan => {
            return {
                scanId: scan._id,
                targetUrl: scan.targetUrl,
                scanType: scan.scanType,
                status: scan.status,
                createdAt: scan.createdAt,
                
                findings: {
                    openPorts: scan.results?.nmap?.openPorts || [],
                    hiddenDirectories: scan.results?.directories || [],
                    totalFindings: (scan.results?.nmap?.openPorts?.length || 0) + 
                                  (scan.results?.directories?.length || 0)
                }
            };
        });
        
        res.json({
            success: true,
            message: "Scan history retrieved",
            totalScans: cleanScans.length,
            scans: cleanScans
        });

    } catch (error) {
        return res.status(500).json({ 
            success: false,
            error: error.message 
        });
    }
}

export async function getScanResults(req, res) {
    try {
        const scanId = req.params.id;
        const userId = req.user.userId;
        
        const result = await scanById(scanId, userId);

        if (!result) {
            return res.status(404).json({ error: "Scan not found" });
        }
        res.json({
            message: "Scan results retrieved",
            scan: result
        });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
export async function removeScan(req, res) {
    try {
        const scanId = req.params.id;
        const userId = req.user.userId;
        
        const result = await deleteScan(scanId, userId);

        if (!result) {
            return res.status(404).json({ error: "Scan not found" });
        }

        res.json({
            message: "Scan deleted successfully",
            deletedScanId: scanId
        });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
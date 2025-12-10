import {exec} from "child_process";
import { promisify} from "util";
import fs from 'fs';
import path from "path";

const execAsync = promisify(exec);

export async function scanWithSkipfish(targetUrl) {
    try {
        console.log(`Starting Skipfish scan for: ${targetUrl}`);
        
        const timestamps = Date.now();
        const reportDir = `/tmp/skipfish-${Date.now()}`;

        const command = `skipfish -o ${reportDir} ${targetUrl}`;
        await execAsync(command);

        const indexPath = path.join(reportDir,'index.html');
        if(!fs.existsSync(indexPath)){
            return{
                success : false,
                error: 'report not generatroed',
                reportPath: reportDir
            }
        }        

        const htmlContent = fs.readFileSync(indexPath, 'utf-8');
        const fileSize = Buffer.byteLength(htmlContent, 'utf-8');

// Also read other important files
        let additionalFiles = [];
        try {
            const files = fs.readdirSync(reportDir);
            additionalFiles = files.filter(f => f.endsWith('.html') && f !== 'index.html');
        } catch (err) {
            console.log('Could not read additional files:', err.message);
        }
        
        return {
            success: true,
            reportPath: reportDir,
            htmlContent: htmlContent,
            fileSize: fileSize,
            additionalFiles: additionalFiles,
            message: `Report generated successfully (${Math.round(fileSize / 1024)} KB)`
        };
        
    } catch (error) {
        console.log('❌ Skipfish error:', error.message);
        return {
            success: false,
            error: error.message,
            reportPath: null
        };
    }
}
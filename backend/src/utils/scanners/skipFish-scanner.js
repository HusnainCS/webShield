import {exec} from "child_process";
import { promisify} from "util";

const execAsync = promisify(exec);

export async function scanWithSkipfish(targetUrl) {
    try {
        console.log(`🔍 Starting Skipfish scan for: ${targetUrl}`);
        
        // Create a unique folder for this scan
        const reportDir = `/tmp/skipfish-${Date.now()}`;
        
        // Simple skipfish command
        const command = `skipfish -o ${reportDir} ${targetUrl}`;
        await execAsync(command);
        
        // Read the HTML report
        const reportPath = `${reportDir}/index.html`;
        const vulnerabilities = [];
        
        // Skipfish creates nice HTML reports you can show users!
        
        console.log(`🎉 Skipfish completed! Report saved at: ${reportDir}`);
        
        return {
            reportPath: reportDir,
            message: "Scan completed. Check HTML report for vulnerabilities."
        };
        
    } catch (error) {
        console.log('❌ Skipfish error:', error.message);
        return {
            reportPath: null,
            error: error.message
        };
    }
}
// nikto-scanner.js
import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs";

const execAsync = promisify(exec);

export async function scanWithNikto(targetUrl) {
  try {
    const timestamp = Date.now();
    const htmlFile = `/tmp/nikto-${timestamp}.html`;
    
    // Run nikto with HTML output
    await execAsync(`nikto -h ${targetUrl} -o ${htmlFile} -Format html`);
    
    // Read HTML report
    const htmlReport = fs.readFileSync(htmlFile, 'utf8');
    
    // Extract vulnerabilities count
    const vulnCount = (htmlReport.match(/class="vuln"/g) || []).length;
    
    return {
      success: true,
      vulnerabilities: vulnCount,
      htmlReport: htmlReport,
      reportPath: htmlFile
    };
    
  } catch (error) {
    return {
      success: false,
      error: error.message,
      htmlReport: null
    };
  }
}
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export async function scanWithSsl(targetUrl) {
  try {
    const domain = targetUrl.replace(/^https?:\/\//, "").replace(/\/.*$/, "").replace(/^www\./, "");

    console.log(`SSL scanning: ${domain}`);

    const command = `sslscan --no-colour ${domain}`;
    const { stdout, stderr } = await execAsync(command, { timeout: 60000 });

    if (stderr && !stderr.includes("openssl")) {
      console.error("SSLScan stderr:", stderr);
    }

    const issues = [];
    const lines = stdout.split("\n");    
    lines.forEach(line => {
      const trimmed = line.trim();
      
      if (trimmed.includes("SSLv") || trimmed.includes("TLSv1.0") || trimmed.includes("TLSv1.1") ||trimmed.includes("weak") ||trimmed.includes("WEAK") ||trimmed.includes("INSECURE")) {
        let cleanLine = trimmed.replace(/^\s*[├└│─]+\s*/, '') .replace(/\s+/g, ' ') .trim();
        if (cleanLine && !issues.includes(cleanLine)) {
          issues.push(cleanLine);
        }
      }
      if (trimmed.includes("expired") || trimmed.includes("self-signed") || trimmed.includes("Invalid") || trimmed.includes("revoked")) { issues.push(`Certificate Issue: ${trimmed}`);
      }
    });

    const hasTLS12 = stdout.includes("TLSv1.2");
    const hasTLS13 = stdout.includes("TLSv1.3");
    if (issues.length === 0 && (hasTLS12 || hasTLS13)) {
      issues.push("No security issues detected");
    }

    return{
      tool: "sslscan",
      success: true,
      totalIssues: issues.length,
      issues: issues.slice(0, 10), 
      rawOutput: stdout.substring(0, 2000), 
      domain: domain
    };

  }catch (error){
    console.error("SSLScan error:", error.message);
    return {
      tool: "sslscan",
      success: false,
      error: "SSL scan failed: ",
      totalIssues: 0,
      issues: ["Scan failed - Could not check SSL/TLS security"],
      rawOutput: ""
    };
  }
}
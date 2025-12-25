import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export async function scanWithNikto(targetUrl) {
  try {
    const url = new URL(targetUrl);
    const host = url.hostname;
    
    const plugins = "outdated,dirs";
    
    console.log(`start scanning nikto for ${host} `)
    const { stdout, stderr } = await execAsync(`nikto -h ${host} -Plugins ${plugins}`);
    const lines = stdout.split("\n");
    const findings = [];
    
    lines.forEach(line => {
      if (line.includes("+"))
         { findings.push(line.trim());}
    });
    
    console.log(`Found ${findings.length} security issues`);
    return {
      success: true,
      totalFindings: findings.length,
      findings: findings,
      rawOutput: stdout.substring(0, 1000)
    };

  } catch (error) {
    console.error("Nikto scan error:", error.message);
    
    return {
      success: false,
      totalFindings: 0,
      findings: [], 
      rawOutput: ""
    };
  }
}
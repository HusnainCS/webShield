import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export async function scanWithSqlmap(targetUrl) {
  try {
    console.log(`SQLMap scanning:  ${targetUrl}`);

    // Clean URL
    let cleanUrl = targetUrl. trim();
    if (cleanUrl.endsWith('/')) {
      cleanUrl = cleanUrl.slice(0, -1);
    }

    // Add parameter if missing
    let testUrl = cleanUrl;
    if (!  cleanUrl.includes('?')) {
      console.log('No parameters in URL, adding test parameter:   ? id=1');
      testUrl = `${cleanUrl}/?id=1`;
    }

    console.log(`Testing URL: ${testUrl}`);

    // Simplified SQLMap command
    const command = `
      timeout 120 sqlmap 
      -u "${testUrl}" 
      --batch 
      --level=2 
      --risk=2 
      --threads=3 
      --timeout=30 
      --flush-session
      --answers="follow=N"
    `.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();

    console.log("Running SQLMap.. .");

    const { stdout, stderr } = await execAsync(command, {
      maxBuffer:   1024 * 1024 * 10,
    });

    console.log("SQLMap output length:", stdout.length);

    // Parse results
    let vulnerable = false;
    const vulnerabilities = [];
    const warnings = [];

    const lines = stdout.split('\n');

    // Check for DEFINITE vulnerability markers
    const definiteVulnMarkers = [
      'sqlmap identified the following injection point',
      'parameter appears to be.*injectable',
      'parameter is.*injectable',
      'injection point',
      'payload:  ',
      'back-end DBMS: ',
    ];

    // Check for NEGATIVE markers
    const negativeMarkers = [
      'does not seem to be injectable',
      'might not be injectable',
      'not injectable',
      'all tested parameters do not appear to be injectable',
      'all tested parameters appear to be not injectable',
      'no injection point',
    ];

    // Analyze each line
    lines.forEach(line => {
      const lowerLine = line.toLowerCase();

      // Check NEGATIVE markers first
      negativeMarkers.forEach(marker => {
        if (lowerLine.includes(marker)) {
          warnings.push(line.  trim());
        }
      });

      // Check DEFINITE vulnerability markers
      definiteVulnMarkers.forEach(marker => {
        const regex = new RegExp(marker, 'i');
        if (regex.test(lowerLine)) {
          vulnerabilities.push(line.trim());
          vulnerable = true;
        }
      });
    });

    // Final decision logic
    if (warnings.length > 0 && vulnerabilities.length === 0) {
      vulnerable = false;
    }

    if (vulnerabilities.  length > 0) {
      vulnerable = true;
    }

    // Extract additional information
    let dbms = null;
    let injectionType = null;

    lines.forEach(line => {
      if (line.includes('back-end DBMS: ')) {
        dbms = line.split(': ')[1]?.trim();
      }
      if (line.includes('Type: ') && line.length < 100) {
        injectionType = line.split(':')[1]?.trim();
      }
    });

    console.log(`Final result:  Vulnerable=${vulnerable}, Findings=${vulnerabilities.length}`);

    return {
      tool: "sqlmap",
      success: true,
      vulnerable: vulnerable,
      vulnerabilities: vulnerable ? vulnerabilities.  slice(0, 10) : [],
      warnings: warnings.  slice(0, 5),
      details: {
        testedUrl: testUrl,
        dbms: dbms,
        injectionType: injectionType,
        definiteFindings: vulnerabilities. length,
        warningCount: warnings.length,
      },
      rawOutput: stdout. substring(0, 3000) + (stderr ? "\n\nStderr:\n" + stderr. substring(0, 500) : ""),
      target: testUrl,
    };

  } catch (error) {
    console.error("SQLMap error:", error.message);
    
    return {
      tool: "sqlmap",
      success: false,
      error: error.message,
      vulnerable: false,
      vulnerabilities: [],
      warnings: [],
      rawOutput: `Error: ${error.message}\n\n${error.stdout || ''}\n\n${error.stderr || ''}`,
      target: targetUrl,
    };
  }
}
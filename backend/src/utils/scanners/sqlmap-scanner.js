import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export async function scanWithSqlmap(targetUrl) {
  try {
    const command = `
      sqlmap -u "${targetUrl}"
      --batch
      --level=1
      --risk=1
      --output-dir=/tmp/sqlmap
    `;

    const { stdout } = await execAsync(command);

    const vulnerabilities = [];

    if (stdout.includes("is vulnerable")) {
      vulnerabilities.push("Possible SQL Injection detected");
    }

    return {
      tool: "sqlmap",
      success: true,
      vulnerable: vulnerabilities.length > 0,
      vulnerabilities,
      rawOutput: stdout
    };
  } catch (error) {
    return {
      tool: "sqlmap",
      success: false,
      error: error.message
    };
  }
}

import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export async function scanWithSsl(targetUrl) {
  try {
    const domain = targetUrl
      .replace(/^https?:\/\//, "")
      .replace(/\/.*$/, "");

    const { stdout } = await execAsync(`sslscan ${domain}`);

    const issues = [];
    const lines = stdout.split("\n");

    for (const line of lines) {
      if (
        line.includes("SSLv3") ||
        line.includes("TLSv1.0") ||
        line.includes("TLSv1.1") ||
        line.includes("weak")
      ) {
        issues.push(line.trim());
      }
    }

    return {
      tool: "sslscan",
      success: true,
      totalIssues: issues.length,
      issues,
      rawOutput: stdout
    };
  } catch (error) {
    return {
      tool: "sslscan",
      success: false,
      error: error.message
    };
  }
}

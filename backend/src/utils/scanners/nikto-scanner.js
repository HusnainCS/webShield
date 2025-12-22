import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export async function scanWithNikto(targetUrl) {
  try {
    const { stdout } = await execAsync(
      `nikto -h ${targetUrl} -nointeractive`
    );

    const issues = [];
    const lines = stdout.split("\n");

    for (const line of lines) {
      if (
        line.includes("OSVDB") ||
        line.includes("Server leaks") ||
        line.includes("X-") ||
        line.includes("allowed")
      ) {
        issues.push(line.trim());
      }
    }

    return {
      tool: "nikto",
      success: true,
      totalIssues: issues.length,
      issues,
      rawOutput: stdout
    };
  } catch (error) {
    return {
      tool: "nikto",
      success: false,
      error: error.message
    };
  }
}

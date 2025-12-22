import { execFile } from "child_process";
import { promisify } from "util";

const execAsync = promisify(execFile);

export async function scanWithNmap(targetUrl) {
  try {
    const domain = targetUrl
      .replace(/^https?:\/\//, "")
      .replace(/\/.*$/, "");

    const { stdout } = await execAsync("nmap", [
      "-sT",
      "-sV",
      "--open",
      domain
    ]);

    const openPorts = [];
    const lines = stdout.split("\n");

    for (const line of lines) {
      if (line.match(/^\d+\/tcp\s+open/)) {
        openPorts.push(line.trim());
      }
    }

    return {
      tool: "nmap",
      success: true,
      openPorts,
      rawOutput: stdout
    };
  } catch (error) {
    return {
      tool: "nmap",
      success: false,
      error: error.message
    };
  }
}

import { execFile } from "child_process";
import { promisify } from "util";
import fs from "fs";
import path from "path";

const execAsync = promisify(execFile);

export async function scanWithNmap(targetUrl) {
  try {
    const domain = targetUrl
      .replace(/^https?:\/\//, "")
      .replace(/[^a-zA-Z0-9.-]/g, "");

    const reportsDir = path.join(process.cwd(), "tmp");
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir);
    }

    const timestamp = Date.now();
    const basePath = path.join(reportsDir, `nmap-${timestamp}`);

    const xmlPath = `${basePath}.xml`;
    const htmlPath = `${basePath}.html`;

    console.log("Running nmap...");
    await execAsync("nmap", ["-sT", "-sV", "-oX", xmlPath, domain]);

 console.log("Converting XML to HTML...");
await execAsync("xsltproc", [
  "-o",
  htmlPath,
  "/usr/share/nmap/nmap.xsl",
  xmlPath
]);


    const htmlReport = fs.readFileSync(htmlPath, "utf-8");

    fs.unlinkSync(xmlPath);
    fs.unlinkSync(htmlPath);

    return {
      tool: "nmap",
      success: true,
      htmlReport
    };

  } catch (error) {
    console.error("NMAP ERROR:", error);
    return {
      tool: "nmap",
      success: false,
      error: error.message
    };
  }
}

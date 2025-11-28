import {exec} from 'child_process';
import { promisify } from 'util';
import { createProgressBar } from '../helper/progressBar.js';

const execAsync = promisify(exec);

export async function scanWithNikto(targetUrl){
    try {
        console.log(`Scanning NIKTO for : ${targetUrl}`);
        const progress = createProgressBar("Nikto Scanning")
        const command = `nikto -h ${targetUrl}`;
        const {stdout} = await execAsync(command);

        clearInterval(progress);
        console.log("Scan completed");

        const lines = stdout.split('\n');
        
        let issues = [];
        let isSecure = true;

        const dangerousKeywords = [
            "outdated","missing","enabled","exposed","dangerous","error","vulnerable","Weak","Directory indexing","publicly accessible"
        ];

        for (let line of lines){
            for(let keywords of dangerousKeywords ){
                if(line.toLowerCase().includes(keywords.toLowerCase())){
                    issues.push(line.trim());
                    isSecure = false;
                }
            }
        }
        return {
        status: isSecure ? "secure" : "not_secure",
        issues: issues,
        message: isSecure
            ? "No major vulnerabilities found. Your website appears secure."
            : "Vulnerabilities detected. Your website needs security improvements."
    };

    } catch (error){
        console.log("Nikto Scan error", error.message);
    }


}
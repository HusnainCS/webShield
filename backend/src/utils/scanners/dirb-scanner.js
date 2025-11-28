import {exec} from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function scanWithDirb(targetUrl){
    try {
        console.log(`Starting DIRB scan for: ${targetUrl} `);

        const command =  `dirb ${targetUrl}`;
        const {stdout } = await execAsync(command);

        const lines = stdout.split('\n');
        const result = [];

        let count = 0;
        for (const line of lines){
            count ++;
            if(count % 50 === 0){
                console.log(`Dirb Processed ${count} lines ....`);
            }
            if(line.includes('+ ') && line.includes('(CODE:')){
                const url = line.split("+ ")[1];
                result.push(url);
                console.log(`Found: ${url}`)
            }

        }
        console.log(`Dirb scan completed! Found ${result.length} directories`)
        return result;

    } catch (error){
        console.log("DIRB Scan erorr: ",error.message);
        return [];

    }
    
}
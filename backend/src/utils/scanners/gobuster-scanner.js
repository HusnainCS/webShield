import {exec} from 'child_process';
import { stdout } from 'process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function scanWithGobuster(targetUrl){
    try{
        let url = targetUrl;

        const command = `gobuster dir -u ${url} -w /usr/share/wordlists/dirb/common.txt`;
        const {stdout} = await execAsync(command);
      
        const lines = stdout.split('\n');
        const foundDirectories = [];

        for(const line of lines){
            if(line.includes('Status: 200') || line.includes('Status: 301') ||line.includes('Status: 302')){
                const parts = line.split(' ');
                if(parts.length > 0){
                    foundDirectories.push(parts[0]);
                    console.log(`Found: ${parts[0]}`);
                }

    }
        }
        console.log(`Gobuster completed. Found ${foundDirectories.length} directories` );
        return foundDirectories;

    } catch(error){
        console.log('Gobsuter Error', error.message);
        return [];

    }

}
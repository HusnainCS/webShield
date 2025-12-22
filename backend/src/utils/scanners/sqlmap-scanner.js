import {exec} from 'child_process';
import { promisify } from 'util';
import { takeCoverage } from 'v8';

const execAsync = promisify(exec);

export async function scanWithSqlmap(targetUrl){
  try {
    console.log(`Starting scan for : ${targetUrl}`);
    targetUrl.replace("https://","").replace("http://","")

  const command = `sqlmap -u ${targetUrl}`;
  const {stdout} = await execAsync(command);
  } catch(error){
    console.log("SQLMAP scan error",error.message);
    console.log("Or recheck the Url");
  }

}

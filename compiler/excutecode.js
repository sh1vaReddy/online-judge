import fs from 'fs';
import { v4 as uuid } from 'uuid';
import { exec, spawn } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import { fileURLToPath } from 'url';


const TIME_LIMIT = 20000;

 const executeWithMemory=async(command,args=[],inputPath=null)=>{
    return new Promise((resolve,reject)=>{
        const startTime=Date.now();
        const child = spawn(command, args, { stdio: ['pipe', 'pipe', 'pipe'] });

        let output = '';
        let error = '';
        child.stdout.on('data', (data) => {
            output += data.toString();
        });

        child.stderr.on('data', (data) => {
            error += data.toString();
        });

        if (inputPath) {
            const inputStream = fs.createReadStream(inputPath);
            inputStream.pipe(child.stdin);
        }
         child.on('close', async (code) => {
            if (code !== 0) {
                reject(new Error(`Process exited with code ${code}: ${error}`));
            } else {
                try {
                    // Use `ps` command (Unix-like systems) to measure memory
                    const memoryCommand = `ps -o rss= -p ${child.pid}`;
                    const { stdout: memoryUsage } = await exec(memoryCommand);
                    const elapsedTime = Date.now() - startTime;
                    resolve({
                        output: output.trim(),
                        memoryUsage: parseInt(memoryUsage.trim(), 10), // Memory in KB
                        elapsedTime, // Time in ms
                    });
                } catch (err) {
                    reject(new Error(`Memory check failed: ${err.message}`));
                }
            }
        });

        // Handle timeout
        setTimeout(() => {
            child.kill('SIGKILL');
            reject(new Error('Execution timed out'));
        }, TIME_LIMIT);

    })

 }
const execAsync = promisify(exec);
const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);
const outputpath = path.join(_dirname, 'outputs');

if (!fs.existsSync(outputpath)) {
    fs.mkdirSync(outputpath, { recursive: true });
}



export const excuteCPP = async (filepath, inputpath) => {
    const outputId = path.basename(filepath).split(".")[0];
    const outputExecutablePath = path.join(outputpath, `${outputId}.exe`);

    try {
        const compileCommand = `g++ -std=c++11 "${filepath}" -o "${outputExecutablePath}"`;
        const {stderr: compilerstderr } = await execAsync(compileCommand);

        if (compilerstderr) {
            return new Error(`Compilation error: ${compilerstderr}`);
        }

        
        const executeCommand = `"${outputExecutablePath}" < "${inputpath}"`;
        const { stdout, stderr } = await execAsync(executeCommand,{ timeout: TIME_LIMIT });

        if (stderr) {
            return new Error(`Runtime error: ${stderr}`);
        }

        return stdout.trim();
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const excutepython = async (filepath, inputpath) => {
    try {
        const { stdout, stderr } = await execAsync(`python3 "${filepath}" < "${inputpath}"`,{ timeout: TIME_LIMIT });

        if (stderr) {
            return new Error(`Runtime error: ${stderr}`);
        }
        return stdout.trim();
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const excuteJava = async (filepath, inputpath) => {
    const outputId = path.basename(filepath).split(".")[0];
    const outputClassPath = path.join(outputpath, `${outputId}.class`);

    try {
        const compileCommand = `javac "${filepath}" -d "${outputClassPath}"`;
        const { stdout: compileStdout, stderr: compilestderr } = await execAsync(compileCommand);

        if (compilestderr) {
            return new Error(`Compilation error: ${compilestderr}`);
        }

        const executeCommand = `java -cp "${outputClassPath}" ${inputpath}`;
        const { stdout, stderr } = await execAsync(executeCommand,{ timeout: TIME_LIMIT });

        if (stderr) {
            return new Error(`Runtime error: ${stderr}`);
        }

        return stdout.trim();
    } catch (error) {
        console.log(error);
        throw error;
    }
};


export const excutejavascript=async(filepath,inputpath)=>
{
    try{
        const {stdout,stderr}=await execAsync(`node "${filepath}"<"${inputpath}"`,{ timeout: TIME_LIMIT });
        
          if(stderr)
          {
            return new Error(stderr);
          }
          return stdout;
    }
    catch(error)
    {
        console.log(error);
        throw error;
    }
}

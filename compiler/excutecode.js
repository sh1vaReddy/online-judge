import fs from 'fs';
import { v4 as uuid } from 'uuid';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import { fileURLToPath } from 'url';

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
        const { stdout, stderr } = await execAsync(executeCommand);

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
        const { stdout, stderr } = await execAsync(`python3 "${filepath}" < "${inputpath}"`);

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
        const { stdout, stderr } = await execAsync(executeCommand);

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
        const {stdout,stderr}=await execAsync(`node "${filepath}"<"${inputpath}"`);
        
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

import fs from 'fs';
import path from 'path';
import {v4 as uuid} from 'uuid';
import { fileURLToPath

 } from 'url';
const _filename=fileURLToPath(import.meta.url);
const _dirname=path.dirname(_filename);

const dirInputs=path.join(_dirname,"Inputs");

if(!fs.existsSync(dirInputs))
{
    fs.mkdirSync(dirInputs,{recursive:true});
}

const generateInputFiles=(inputs)=>
{
    const inputId=uuid();

    const input_filename=`${inputId}.txt`;
    const input_filepath=path.join(dirInputs,input_filename);

    fs.writeFileSync(input_filepath,inputs);

    return input_filepath;
}

export default generateInputFiles;
import fs from 'fs';
import path from 'path';
import { v4 as uuid  } from 'uuid';
import  {fileURLToPath} from 'url';


const _filename=fileURLToPath(import.meta.url);
const _dirname=path.dirname(_filename);

const dirCodes=path.join(_dirname,"codes");

if(!fs.existsSync(dirCodes))
{
    fs.mkdirSync(dirCodes,{recursive:true});
}   


const generateFile=(language,code)=>
{

    const extensionMapping = {
        javascript:'js',
        python:'py',
        cpp:'cpp',
        java:'java',
    }

    const fileExtension=extensionMapping[language] || language;
    const FIleId=uuid();
    const filename=`${FIleId}.${fileExtension}`;
    const filepath=path.join(dirCodes,filename);

    fs.writeFileSync(filepath,code);
    return filepath;
};

export default generateFile;
import express from 'express';
const app = express();
import dotenv from 'dotenv';
import generateFile from './generataFile.js'
import generateInputFiles from './generateInputFile.js';
import cors from "cors";
import { excuteCPP, excuteJava, excutejavascript, excutepython } from './excutecode.js';
dotenv.config();

app.use(express.json());

app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE"],
    })
  );

app.get('/', (req, res) => {
  res.status(200).json("Online compiler");
});

app.post("/compile", async (req, res) => {

  const { language = "cpp", code, Input } = req.body;

  if (!code) {
    return res.status(400).json({ success: false, error: "Code is required" });
  }

  const filepath = generateFile(language, code);
  const inputfilepath = generateInputFiles(Input);

  let output;

  try {
    switch (language) {
      case "cpp":
        output = await excuteCPP(filepath, inputfilepath);
        break;
      case "python":
        output = await excutepython(filepath, inputfilepath);
        break;
      case "java":
        output = await excuteJava(filepath, inputfilepath);
        break;
      case "javascript":
        output = await excutejavascript(filepath, inputfilepath);
        break;
      default:
        return res.status(400).json({ success: false, error: "Unsupported language" });
    }

    return res.json({ success: true, output });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

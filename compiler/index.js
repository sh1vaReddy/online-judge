import express from "express";
import dotenv from "dotenv";
import generateFile from "./generataFile.js";
import generateInputFiles from "./generateInputFile.js";
import cors from "cors";
import {
  excuteCPP,
  excuteJava,
  excutejavascript,
  excutepython,
} from "./excutecode.js";

import { analyzeCpp, analyzeJavaScript, analyzePython, analyzeJava } from './analyzeTime.js';
import { verdict } from "./verdicate.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.get("/", (req, res) => {
  res.status(200).json("Online compiler");
});

// Compilation route
app.post("/compile", async (req, res) => {
  const { language = "cpp", code, Input } = req.body;

  if (!code) {
    return res.status(400).json({ success: false, error: "Code is required" });
  }

  try {
    const filepath = await generateFile(language, code);
    const inputFilePath = await generateInputFiles(Input);

    let output;

    switch (language) {
      case "cpp":
        output = await excuteCPP(filepath, inputFilePath);
        break;
      case "python":
        output = await excutepython(filepath, inputFilePath);
        break;
      case "java":
        output = await excuteJava(filepath, inputFilePath);
        break;
      case "javascript":
        output = await excutejavascript(filepath, inputFilePath);
        break;
      default:
        return res.status(400).json({ success: false, error: "Unsupported language" });
    }

    return res.json({ success: true, output });
  } catch (error) {
    console.error("Error during compilation:", error);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// Run code route
app.post("/run", async (req, res) => {
  const { language = "cpp", code, input, ProblemId } = req.body;

  if (!code) {
    return res.status(400).json({ success: false, message: "Code is required" });
  }

  try {
    const filepath = await generateFile(language, code);
    const inputFilePath = await generateInputFiles(input);

    const excutecode = async (input) => {
      const inputFilePath = await generateInputFiles(input);
      switch (language) {
        case "cpp":
          return await excuteCPP(filepath, inputFilePath);
        case "python":
          return await excutepython(filepath, inputFilePath);
        case "java":
          return await excuteJava(filepath, inputFilePath);
        case "javascript":
          return await excutejavascript(filepath, inputFilePath);
        default:
          throw new Error("Unsupported language");
      }
    };

    const verdictResult = await verdict(ProblemId, excutecode);
    res.status(200).json({
      success: true,
      message: "Result",
      verdictResult,
    });
  } catch (error) {
    console.error("Error during execution:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Time complexity route
app.post('/time-complexity', async (req, res) => {
  const { code, language } = req.body;

  if (!code || !language) {
    return res.status(400).json({ error: "Code and language are required" });
  }

  try {
    let timeComplexity = calculateTimeComplexity(code, language);
    res.json({ timeComplexity });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Calculate time complexity
const calculateTimeComplexity = (code, language) => {
  let maxLoopDepth = 0;

  switch (language) {
    case "cpp":
      maxLoopDepth = analyzeCpp(code);
      break;
    case "python":
      maxLoopDepth = analyzePython(code);
      break;
    case "java":
      maxLoopDepth = analyzeJava(code);
      break;
    case "javascript":
      maxLoopDepth = analyzeJavaScript(code);
      break;
    default:
      throw new Error('Unsupported programming language');
  }

  return maxLoopDepth === 0 ? 'O(1)' : `O(n^${maxLoopDepth})`;
};

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

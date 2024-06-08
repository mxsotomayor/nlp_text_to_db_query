const path = require("path");
const fs = require("fs");
const { readFile } = require("fs/promises");

const PROMPTS_MAP_HEAD_INSTRUCTION = {
  opensearch: {
    headReturnInstruction:
      "only Open  Search query JSON Objects ready to use or false",
    schemaFormat: "index of document have this fields",
  },
};

const isValidQueryFormat = (format = "") => {
  return Object.keys(PROMPTS_MAP_HEAD_INSTRUCTION).indexOf(format) !== -1;
};

const getExplainFileParsed = async (customFile) => {
  try {
    const text = await readFile(path.join(process.cwd(), customFile), "utf-8");
    return JSON.parse(text);
  } catch {
    console.log(
      "explainFile.js cant be parsed, searching for %s",
      path.join(process.cwd(), customFile)
    );
    process.exit();
  }
};

const parseExplainFile = async (customFile = "explainFile.json") => {
  if (!fs.existsSync(path.join(process.cwd(), customFile))) {
    console.log(
      "explainFile.js doesnt exist, searching for %s",
      path.join(process.cwd(), customFile)
    );
    process.exit();
  }

  const explainFile = await getExplainFileParsed(customFile);

  const queryFormat = explainFile["queryFormat"];

  if (!isValidQueryFormat(queryFormat)) {
    console.error(
      "🔴 Error reading explainFile, not valid query format, given '%s', expected one of: %s",
      queryFormat,
      Object.keys(PROMPTS_MAP_HEAD_INSTRUCTION)
    );
    return;
  }

  const DB_FIELDS_EXPLANATION = explainFile["schema"]
    .map((field) => `${field.name} : ${field.is}`.replace(/\s+/g, " "))
    .join("\n");

  const LLMPrompt = `you're a query builder assistant that return ${PROMPTS_MAP_HEAD_INSTRUCTION[queryFormat].headReturnInstruction}, 

    please follow the instructions and be so straight as you can, don't be creative, avoid add explanatory text.

    before create the result query have in mind that the ${PROMPTS_MAP_HEAD_INSTRUCTION[queryFormat].schemaFormat}  structure:
    ${DB_FIELDS_EXPLANATION}

    instructions: create an open search ready to use query for:
    {question}

    avoid extra text, return just JSON object ready to pass to a function or just false text in case you cant create a valid query using the given fields.`;

  process.env["__LLM_PROMPT"] = LLMPrompt;
};

module.exports.parseExplainFile = parseExplainFile;

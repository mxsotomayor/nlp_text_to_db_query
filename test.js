import { getOpenSearchQuery, parseExplainFile } from "./dist/index.js";

const run = async () => {
  // explain the database explain file only once
  await parseExplainFile("explainFile.example.json");

  const question = "who is the smartest student in the room";

  const query = await getOpenSearchQuery(question);

  console.log(JSON.stringify(query, undefined, "  "));
};

run();

const { OpenAI } = require("@langchain/openai");

const getOpenSearchQuery = async (question = "") => {
  try {
    const LLMPrompt = process.env.__LLM_PROMPT.replace("{question}", question);

    if (!process.env.__LLM_PROMPT) {
      console.log(
        "Error building query, make sure that you initialized the prompt"
      );
      return;
    }

    if (!process.env.OPENAI_API_KEY) {
      console.log(
        "Error building query, OpenAI environment variable not found."
      );
      return;
    }

    const model = new OpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      maxTokens: 512,
      temperature: 0,
    });

    console.time("llm_call");

    const llmResult = await model.invoke(LLMPrompt);

    console.timeEnd("llm_call");

    return JSON.parse(llmResult);
  } catch (e) {
    console.log("Error on getOpenSearchQuery:, ", e);
    return false;
  }
};

module.exports.getOpenSearchQuery = getOpenSearchQuery;

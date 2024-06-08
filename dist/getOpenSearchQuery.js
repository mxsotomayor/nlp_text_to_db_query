import { OpenAI } from "@langchain/openai";

export const  getOpenSearchQuery = async (question = "") => {
  try {
    const LLMPrompt = process.env.__LLM_PROMPT.replace("{question}", question);

    const model = new OpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      maxTokens: 512, // only for completion
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

 
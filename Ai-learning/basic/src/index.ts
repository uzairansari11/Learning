import { OpenAI } from "openai";
import { encoding_for_model } from "tiktoken";
const openai = new OpenAI();

function encodingPrompt() {
  const prompt = "How are you today????";
  const encoder = encoding_for_model("gpt-3.5-turbo");
  const word = encoder.encode(prompt);
  console.log(word);
}
encodingPrompt();

const modelGeneration = async () => {
  try {
    const response = await openai.responses.create({
      model: "chatgpt-4o-latest",
      input: "can you please let me know height of mount ",
    });

    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
modelGeneration();

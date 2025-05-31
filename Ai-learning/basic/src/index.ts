const OpenAI = require("openai");
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Set your API key
});

// Dynamic import for tiktoken (ESM-only)
async function encodingPrompt() {
  const { encoding_for_model } = await import("tiktoken");
  const encoder = encoding_for_model("gpt-3.5-turbo");
  const prompt = "How are you today????";
  const word = encoder.encode(prompt);
  console.log("Tokenized Prompt:", word);
}

encodingPrompt();

const modelGeneration = async () => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: "can you please let me know height of mount Everest?",
        },
      ],
    });

    console.log("OpenAI Response:", response.choices[0].message.content);
  } catch (error) {
    console.error("Error:", error);
  }
};

modelGeneration();

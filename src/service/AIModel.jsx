import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyAguj3bkf79vhCkAuU3krcguBWvYlR3S9g"
});

async function run() {
  const model = ai.getGenerativeModel({
    model: "gemini-1.5-flash"
  });

  const result = await model.generateContent("Write your prompt here");
  console.log(result.text());
}

run();

    


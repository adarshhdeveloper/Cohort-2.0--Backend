
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import * as readline from 'readline';
import { HumanMessage, tool, createAgent } from "langchain";



const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: "AIzaSyCPhtVFhrmpQlEnBDR7BmGc6cD3LueAnmM",
});

// const message = []

while (true) {
    const userInput = await rl.question("You:");

    const response = await model.invoke(userInput);

    console.log(`AI : ${response.text}`);
}


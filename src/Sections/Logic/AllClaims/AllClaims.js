import { sendRequestOpenAI } from "../../../ServerConnector/ServerConnector";

export async function computeAllClaims(text) {
  const prompt = `Consider this speech:\n\n${text}\n\nList the most important claims contained inside the speech:\n\n1.`;
  const response = await sendRequestOpenAI(prompt, 256);
  return "1. " + response.trim();
}

import { sendRequestOpenAI } from "../../../ServerConnector/ServerConnector";

export async function computeConclusion(text) {
  const prompt = `Consider this speech:\n\n${text}\n\nShould I trust this speech? Why or why not?`;
  const response = await sendRequestOpenAI(prompt, 256);
  return response;
}

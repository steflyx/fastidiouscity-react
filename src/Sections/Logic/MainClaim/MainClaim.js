import { sendRequestOpenAI } from "../../../ServerConnector/ServerConnector";

export async function computeMainClaim(text) {
  const prompt = `Consider this speech:\n\n${text}\n\nThe main claim of this speech is`;
  const response = await sendRequestOpenAI(prompt, 200);
  return response.trim();
}

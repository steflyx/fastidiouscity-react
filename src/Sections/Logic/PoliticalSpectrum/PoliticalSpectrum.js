import { sendRequestOpenAI } from "../../../ServerConnector/ServerConnector";

export async function computePoliticalSpectrum(text) {
  const prompt = `Consider this speech:\n\n${text}\n\nDo you think it's more conservative or liberal (one-word answer)?`;
  const response = await sendRequestOpenAI(prompt, 128);
  return response.trim();
}

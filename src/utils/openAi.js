import OpenAI from "openai";

import dotenv from "dotenv";
//set directory dirname
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "../../config/.env") });
const configuration = new OpenAI.Configuration({
  apiKey: process.env.open_Ai_Key,
});
export const openai = new OpenAI.OpenAIApi(configuration);

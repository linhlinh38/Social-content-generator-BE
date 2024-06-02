import dotenv from "dotenv";

dotenv.config();
//Port
export const PORT = process.env.PORT;
//Config Twilio
export const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
export const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
//Config Google AI API
export const API_KEY = process.env.API_KEY

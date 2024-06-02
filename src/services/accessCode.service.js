import { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } from "../configs/env.config.js";
import { db } from "../configs/firebase.config.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const twilio = require('twilio');


const twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

function generateAccessCode() {
  return Math.floor(100000 + Math.random() * 900000);
}

async function sendSMS(phoneNumber, accessCode) {
  try {
    const message = await twilioClient.messages.create({
      body: `Your access code is: ${accessCode}`,
      from: '+840967503215', 
      to: phoneNumber,
    });
    console.log(`SMS sent: ${message.sid}`);
  } catch (error) {
    console.error('Error sending SMS:', error);
  }
}

async function createNewAccessCode(phoneNumber) {
  try {
    const accessCode = generateAccessCode();
    const docRef = db.collection('accessCodes').doc(phoneNumber);
    await docRef.set({ accessCode });
    await sendSMS(phoneNumber, accessCode);
    return;
  } catch (error) {
    console.error('Error creating access code:', error);
    throw new Error({ message: 'Internal server error' });
  }
}

async function validateAccessCode(phoneNumber, accessCode) {
  try {
    const docRef = db.collection('accessCodes').doc(phoneNumber);
    const doc = await docRef.get();
    if (!doc.exists) {
      throw new Error({ message: 'Invalid access code' });
    }

    const storedAccessCode = doc.data().accessCode;
    if (storedAccessCode === accessCode) {
      await docRef.update({ accessCode: '' });
      return
    } else {
      throw new Error({ message: 'Invalid access code' });
    }
  } catch (error) {
    console.error('Error creating access code:', error);
    throw new Error({ message: 'Internal server error' });
  }
}

export const accessCodeService = {
    createNewAccessCode,
    validateAccessCode
}
import { accessCodeService } from "../services/accessCode.service.js";

async function createNewAccessCode(req, res, next){
  const { phoneNumber } = req.body;

  if (!phoneNumber) {
    return res.status(400).json({ message: 'Missing phone number' });
  }
  try {
    await accessCodeService.createNewAccessCode(phoneNumber)
    return res.status(200).json({ message: 'Access code sent' });
  } catch (error) {
    console.error('Error creating access code:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

async function validateAccessCode(req, res, next){
   const { phoneNumber, accessCode } = req.body;

  if (!phoneNumber || !accessCode) {
    return res.status(400).json({ message: 'Missing phone number or access code' });
  }

  try {
    await accessCodeService.validateAccessCode(phoneNumber, accessCode)
    return res.status(200).json({ message: 'validate success' });
  } catch (error) {
    console.error('Error validate access code:', error);
    return res.status(500).json({ message: 'Validate access code fail' });
  }
}

export const accessCodeController = {
    createNewAccessCode,
    validateAccessCode
}
import express from 'express';
import { accessCodeController } from '../controllers/accessCode.controller.js';

const accessCodeRoute = express.Router();
accessCodeRoute.post("/CreateNewAccessCode", accessCodeController.createNewAccessCode);
accessCodeRoute.post("/ValidateAccessCode", accessCodeController.validateAccessCode);

export default accessCodeRoute;
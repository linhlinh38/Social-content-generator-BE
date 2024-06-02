import express from 'express';
import { contentController } from '../controllers/content.controller.js';

const contentRoute = express.Router();
contentRoute.post("/GeneratePostCaptions", contentController.generatePostCaptions);
contentRoute.post("/GetPostIdeas", contentController.getPostIdeas);
contentRoute.post("/CreateCaptionsFromIdeas", contentController.createCaptionsFromIdeas);
contentRoute.post("/SaveGeneratedContent", contentController.saveGeneratedContent);
contentRoute.get("/GetUserGeneratedContents/:phone_number", contentController.getUserGeneratedContents);
contentRoute.post("/UnSaveContent", contentController.unSaveGeneratedContent);

export default contentRoute;
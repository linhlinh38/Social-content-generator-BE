import { contentService } from "../services/content.service.js";

async function generatePostCaptions(req, res, next){
  const { socialNetwork, subject, tone} = req.body;
  try {
    const caption = await contentService.generateCaption(socialNetwork, subject, tone);
    return res.status(200).json({ captions: caption });
  } catch (error) {
    console.error('Error creating caption:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

async function getPostIdeas(req, res, next){
  const { topic } = req.body;
  try {
    const ideas = await contentService.getPostIdeas(topic);
    return res.status(200).json({ PostIdeas: ideas });
  } catch (error) {
    console.error('Error creating ideas:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

async function createCaptionsFromIdeas(req, res, next){
  const { ideas } = req.body;
  try {
    const captions = await contentService.createCaptionsFromIdeas(ideas);
    return res.status(200).json({ Captions: captions });
  } catch (error) {
    console.error('Error creating Captions:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

async function saveGeneratedContent(req, res, next){
  const { topic, data, phone } = req.body;

  if (!topic || !data) {
    return res.status(400).json({ message: 'Missing topic or data' });
  }

  try {
    await contentService.saveGeneratedContent(topic, data, phone);
    return res.status(200).json({ message: 'Saved generated content successfully' });
  } catch (error) {
    console.error('Error saving generated content:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function unSaveGeneratedContent(req, res, next){
 const { topic, dataDelete, phone } = req.body;

  if (!topic || !dataDelete) {
    return res.status(400).json({ message: 'Missing topic or data' });
  }

  try {
    await contentService.unSaveGeneratedContent(topic, dataDelete, phone)
    return res.status(200).json({ message: 'Deleted content successfully' });
  } catch (error) {
    console.error('Error deleting content:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

async function getUserGeneratedContents(req, res, next){
 const { phone_number } = req.params;

  if (!phone_number) {
    return res.status(400).json({ message: 'Missing phone number parameter' });
  }

  try {
    const generatedContents = await contentService.getUserGeneratedContents(phone_number);
    return res.status(200).json({ generatedContents });
  } catch (error) {
    console.error('Error retrieving generated content:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export const contentController = {
    generatePostCaptions,
    getPostIdeas,
    createCaptionsFromIdeas,
    saveGeneratedContent,
    unSaveGeneratedContent,
    getUserGeneratedContents
}
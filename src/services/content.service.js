//import { FieldValue } from "firebase/firestore";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { FieldValue } = require('firebase-admin/firestore');
import { GoogleGenerativeAI } from "@google/generative-ai";
import { db } from '../configs/firebase.config.js'; 
import { API_KEY } from '../configs/env.config.js';

const genAI = new GoogleGenerativeAI(API_KEY);

async function generateCaption(socialNetwork, subject, tone) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", generationConfig: { response_mime_type: "application/json" }});
  const jsonSchema = {
    title: "10 post captions",
    description:
      "List 10 post caption follow the following properties.",
    type: "array",
    items: {
      type: "object",
      properties: {
        data: { description: "Captions follow the topic, subject and tone.", type: "string" },
      },
      additionalProperties: false,
    },
  };
  const prompt = `Generate ${socialNetwork} captions for the topic "${subject}" in a ${tone} tone 
  follow JSON schema.<JSONSchema>${JSON.stringify(
    jsonSchema
  )}</JSONSchema>`;
  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  return text;
}

async function getPostIdeas(topic) {
   const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", generationConfig: { response_mime_type: "application/json" }});
  const jsonSchema = {
    title: "10 post ideas",
    description:
      "List 10 post ideas follow the following properties.",
    type: "array",
    items: {
      type: "object",
      properties: {
        data: { description: "Ideas follow the topic", type: "string" },
      },
      additionalProperties: false,
    },
  };
  const prompt = `Generate 10 post ideas based on the topic: ${topic}   
  and response follow JSON schema.<JSONSchema>${JSON.stringify(
    jsonSchema
  )}</JSONSchema>`;
  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  return text;
}

async function createCaptionsFromIdeas(ideas) {
   const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", generationConfig: { response_mime_type: "application/json" }});
   const jsonSchema = {
    title: "10 post captions",
    description:
      "List 10 post caption follow the following properties.",
    type: "array",
    items: {
      type: "object",
      properties: {
        data: { description: "Captions follow the ideas.", type: "string" },
      },
      additionalProperties: false,
    },
  };
  const prompt = `Generate 10 captions based on the post idea: ${ideas}. 
  Follow JSON schema.<JSONSchema>${JSON.stringify(
    jsonSchema
  )}</JSONSchema>`;
  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  return text;
}

async function saveGeneratedContent(topic, data, phone){
    try {
    const contentRef = db.collection('content').doc(phone).collection('topics').doc(topic);
    const docSnapshot = await contentRef.get(); 

    if (!docSnapshot.exists) {
      await contentRef.set({ data: FieldValue.arrayUnion(data) });
    }
    await contentRef.update({ data: FieldValue.arrayUnion(data) });
    return;
  } catch (error) {
    console.error('Error saving generated content:', error);
    throw new Error({ message: 'Internal server error' })
  }
}

async function unSaveGeneratedContent(topic, dataDelete, phone){
    try {
    const contentRef = db.collection('content').doc(phone).collection('topics').doc(topic);
    const docSnapshot = await contentRef.get(); 

    if (!docSnapshot.exists) {
        throw new Error({ message: 'Topic not found' });
    }

    const currentData = docSnapshot.data().data || []; 
    const updatedData = currentData.filter(item => item !== dataDelete);

    if (updatedData.length === 0) {
      await contentRef.delete();
    } else {
      await contentRef.update({ data: updatedData });
    }
    return;
  } catch (error) {
    console.error('Error deleting content:', error);
     throw new Error({ message: 'Internal server error' });
  }
}

async function getUserGeneratedContents(phone_number){
    try {
    const contentRef = db.collection('content').doc(phone_number).collection('topics');
    const snapshot = await contentRef.get();
    const generatedContents = [];

    for (const topicDoc of snapshot.docs) {
      const topicData = topicDoc.data();
      generatedContents.push({ topic: topicDoc.id, data: topicData.data }); 
    }
    return generatedContents;
  } catch (error) {
    console.error('Error retrieving generated content:', error);
    throw new Error({ message: 'Internal server error' });
  }
}

export const contentService = {
    generateCaption,
    getPostIdeas,
    createCaptionsFromIdeas,
    saveGeneratedContent,
    unSaveGeneratedContent,
    getUserGeneratedContents
}

const { VertexAI } = require("@google-cloud/vertexai");
const ChatRepository = require('./chat-repository')

const vertexAI = new VertexAI({
    project: process.env.PROJECT_ID,
    location: "us-central1",
});

const generativeModel = vertexAI.getGenerativeModel({
    model: "gemini-1.5-flash-001",
});

module.exports = {
    async getChat(req, res) {
        const chatRepo = new ChatRepository();

        try {
            const { userID } = req.body;
            const chat = await chatRepo.findChatByUserID(userID);

            return res.status(200).json({
                success: true,
                message: "Chat retrieved successfully",
                data: chat ? chat.chats : []
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: "Failed to retrieve chat"
            });
        }
    },

    async askQuestion(req, res) {
        const chatRepo = new ChatRepository();

        try {
            const { userID, prompt } = req.body;
            
            const existingChat = await chatRepo.findChatByUserID(userID);
            if (!existingChat) {
                await chatRepo.createChat(userID);
            }

            const chats = existingChat ? existingChat.chats : [];
            const questions = [];
            chats.forEach(chat => {
                questions.push({
                    text: chat.question
                });
            });
            questions.push({
                text: prompt
            });

            const chatroom = generativeModel.startChat({
                history: questions
            });
            const result = await chatroom.sendMessage(prompt);
            const response = await result.response;
            const geminiResponse = await response.text();
            chats.push({
                question: prompt,
                answer: geminiResponse
            });

            await chatRepo.updateChatByUserID(userID, {
                chats: chats
            });

            return res.status(200).json({
                success: true,
                message: "Question answered successfully"
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
}
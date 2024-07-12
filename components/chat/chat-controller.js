const { GoogleGenerativeAI } = require("@google/generative-ai")
const ChatRepository = require('./chat-repository')

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY)

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
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

            const result = await model.generateContent(prompt + "Please answer in 2-3 short sentences with punctuation as necessary and in the languange of original question.");
            const response = result.response;
            let geminiResponse = response.text();
            if (geminiResponse.endsWith("\n")) {
                geminiResponse = geminiResponse.slice(0, -1);
            }

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
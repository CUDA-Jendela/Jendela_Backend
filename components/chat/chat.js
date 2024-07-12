const { VertexAI } = require("@google-cloud/vertexai");

async function generate_from_text_input() {
    const vertexAI = new VertexAI({
        project: process.env.PROJECT_ID,
        location: "us-central1",
    });

    const generativeModel = vertexAI.getGenerativeModel({
        model: "gemini-1.5-flash-001",
    });

    const prompt =
        "What's a good name for a flower shop that specializes in selling bouquets of dried flowers?";

    const resp = await generativeModel.generateContent(prompt);
    const contentResponse = await resp.response;
    console.log(JSON.stringify(contentResponse));
}
generate_from_text_input();
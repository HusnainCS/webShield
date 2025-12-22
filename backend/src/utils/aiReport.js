import Groq from "groq-sdk"
import dotenv from "dotenv";
dotenv.config();

const groq = new Groq({
    apiKey : process.env.GROQ_API

});

export async function aiReport(summaryText){
    const response = await groq.chat.completions.create({
        model : "llama-3.1-8b-instant",
        messages : [
            {
                role : "system",
                content: "Your are a cyber security assistant. Explain scan results in simple, non-technical language",
            },
            {
                role : "user",
                content : summaryText
            }
        ]
    });
    return response.choices[0].message.content;
}
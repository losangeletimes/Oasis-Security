import OpenAI from "openai";
const client = new OpenAI();

async function getPositiveNews() {
    try {
        const completion = await client.chat.completions.create({
            model: "gpt-4o", // or "gpt-4-turbo" depending on your access
            messages: [{
                role: "user",
                content: "What was a positive news story from today?"
            }],
        });
        console.log(completion.choices[0].message.content);
    } catch (error) {
        console.error("Error fetching completion:", error);
    }
}

getPositiveNews();
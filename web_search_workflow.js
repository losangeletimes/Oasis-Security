import OpenAI from "openai";
const openai = new OpenAI();

// 1. User asks a question that requires a web search
const messages = [
    { role: "user", content: "What was a positive news story from today?" }
];

// 2. Set up the tool/function definition
const tools = [
    {
        type: "function",
        function: {
            name: "web_search",
            description: "Search the web for recent news or information.",
            parameters: {
                type: "object",
                properties: {
                    query: {
                        type: "string",
                        description: "The search query for the web search"
                    },
                    freshness: {
                        type: "string",
                        description: "How recent the results should be (e.g. 'day', 'week', 'month')."
                    }
                },
                required: ["query"]
            }
        }
    }
];

// 3. Call OpenAI with the initial user message and tool definition
const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages,
    tools,
    tool_choice: {
        type: "function",
        function: {
            name: "web_search"
        }
    }
});

// 4. Check if the model wants to call the tool
const toolCalls = response.choices[0].message.tool_calls;
if (toolCalls && toolCalls.length > 0) {
    // 5. Extract the tool call parameters
    const toolCall = toolCalls[0];
    const params = JSON.parse(toolCall.function.arguments);

    // 6. Actually perform the web search here with your logic or API.
    // For this example, let's mock a search result:
    const toolResult = {
        result: "A major wildlife conservation win: A critically endangered species was reintroduced to its native habitat today, with experts celebrating a significant step for biodiversity."
    };

    // 7. Add the tool response to the conversation
    messages.push(response.choices[0].message);
    messages.push({
        role: "tool",
        tool_call_id: toolCall.id,
        name: toolCall.function.name,
        content: JSON.stringify(toolResult)
    });

    // 8. Ask OpenAI to finish the conversation, using the tool output
    const finalResponse = await openai.chat.completions.create({
        model: "gpt-4o",
        messages,
    });

    console.log(finalResponse.choices[0].message.content);
} else {
    // If the model doesn't call a tool, just show its answer
    console.log(response.choices[0].message.content);
} 
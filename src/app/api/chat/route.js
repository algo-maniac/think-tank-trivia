import { OpenAIApi, Configuration } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";

export const runtime = 'edge';
const GPT_API_KEY = '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';
const config = new Configuration({
    // apiKey: process.env.GPT_API_KEY
    apiKey: GPT_API_KEY
})
const openai = new OpenAIApi(config);
 
export async function POST(request) {
    const { messages } = await request.json();

    console.log(messages);

    //createCompletion(get response from gpt-4)
    const response = await openai.createChatCompletion({
        model:'gpt-3.5-turbo',
        stream:true,
        messages:[
            {role:"system" , content:"you are helpfull assistent..."},
            ...messages
        ]
    })

    //create a stream of data from response ....
    const stream = await OpenAIStream(response);

    //send the stream to our frontend .....
    return new StreamingTextResponse(stream);
}

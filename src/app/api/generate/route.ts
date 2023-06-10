import openai from "@/utils/openai";

export async function POST(req: Request) {
    
    try {

        const {text} = req.json()

        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "user",
                    content: `Act as receving a text fron a fresh record from a human to text. Take the text and summarize it with giving a title for the summarized pargraph. You will need to filter out iterjections or vocal fillers to make crystal clear summarized paragraph with giving a title for it, (dont talk like she is or he is, instead talk like what the user is saying in the text). Here's the text to work on ${text}`, 
                }
            ]
        })

    return new Response(completion.data.choices[0]?.message?.content, {status: 200})
    
    } catch (error) {
        return new Response("Invalid request", {status: 400})
    }
}
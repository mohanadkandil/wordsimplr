import { NextApiRequest, NextApiResponse } from "next";
import openai from "utils/openai";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
    const {text} = req.query
    
    try {
        const completion = await openai.createChatCompletion({
            model: 'text-davinci-003',
            messages: [
                {
                    role: 'user',
                    content: `Act as receving a text fron a fresh record from a human to text. Take the text and summarize it with giving a title for the summarized pargraph. You will need to filter out nterjections or vocal fillers to make crystal clear summarized paragraph with giving a title for it. Here's the text to work on ${text}`, 
                }
            ]
        });

        const generatedText = JSON.parse(completion.data.choices[0]?.message.content)
        return res.status(200).json({generatedText})
        
        
    } catch(err: any) {
        if (error.response) {
            console.log(err.response.status);
            console.log(err.response.data);
        }else {
            console.log(err.message)
        }

        return res.status(403).json({err: "Error"})
    }

}
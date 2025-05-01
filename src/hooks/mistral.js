import { toast } from 'sonner';
import { config } from 'dotenv';
config();

const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY ;
const MISTRAL_API_ENDPOINT = "https://api.mistral.ai/v1/chat/completions";

export async function adjustTone(text, toneLevel) {
    try {
        let toneDescription = "neutral and balanced";

        if (toneLevel < 25) {
            toneDescription = "very formal, professional, and precise";
        } else if (toneLevel < 50) {
            toneDescription = "somewhat formal and professional";
        } else if (toneLevel < 75) {
            toneDescription = "conversational and friendly";
        } else {
            toneDescription = "casual, relaxed, and informal";
        }

        const messages = [
            {
                role: "system",
                content: `You are a helpful tone adjustment assistant. Rewrite the text to make it sound ${toneDescription}. 
                  Preserve all the original meaning and information. Only change the tone and style, not the content.
                  Return ONLY the rewritten text without any explanations, introductions, or additional commentary.`
            },
            {
                role: "user",
                content: text
            }
        ];


        const response = await fetch(MISTRAL_API_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${MISTRAL_API_KEY}`
            },
            body: JSON.stringify({
                model: "mistral-small",
                messages: messages
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || "Failed to adjust tone");
        }

        const data = await response.json();
        return {
            content: data.choices[0].message.content
        };
    } catch (error) {
        console.error("Tone adjustment failed:", error);
        toast.error("Failed to adjust tone. Please try again.");
        return {
            content: text,
            error: error instanceof Error ? error.message : "Unknown error occurred"
        };
    }
}


// (async () => {
//     const response = await adjustTone(
//         "Hi Joe, how are you? Just wanna check with you whether there's a job vacancy in your coolest, chill company.",
//         20
//     );
//
//     console.log("Adjusted Tone:", response.content);
//     if (response.error) {
//         console.error("Error:", response.error);
//     }
// })();
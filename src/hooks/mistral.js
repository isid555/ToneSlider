import { toast } from 'sonner';

const backendURL = "https://toneslider.up.railway.app"

export  async function adjustTone(text, toneLevel) {
    try {
        const response = await fetch(`${backendURL}/adjust-tone`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text, toneLevel })
        });

        const rawText = await response.text();

        let data;
        try {
            data = JSON.parse(rawText);
        } catch (parseError) {
            throw new Error("Invalid JSON received from backend.");
        }

        if (!response.ok || !data?.content) {
            throw new Error(data?.error || "Unknown API error");
        }


        return { content: data.content };

    } catch (error) {
        console.error("Tone adjustment failed:", error);
        toast.error("Failed to adjust tone. Please reload and try again.");
        return {
            content: text,
            error: error.message || "Unknown error occurred"
        };
    }
}

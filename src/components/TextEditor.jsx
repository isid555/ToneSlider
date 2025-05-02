import React, { useEffect } from "react";

export function TextEditor({ value, onChange, loadingState }) {
    const defaultText = `Hey there! This is a sample paragraph to get you started. It's here to give you an idea of how your content might look before you start typing your own text. Feel free to adjust it as needed. The tone of this content can be modified to be more formal or casual, depending on the settings you choose.`;

    useEffect(() => {
        if (!value || value === " ") {
            onChange(defaultText);
        }
    }, [value, onChange]);

    const handleChange = (e) => {
        onChange(e.target.value);
    };

    return (
        <div className="bg-black rounded-xl shadow-lg p-6 w-full space-y-4 border border-gray-700 text-white">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold tracking-tight">Text Editor</h3>
                {loadingState === "loading" && (
                    <div className="flex items-center space-x-2 text-sm text-gray-300">
                        <div className="w-3 h-3 border-2 border-gray-500 border-t-white rounded-full animate-spin"></div>
                        <span>Generating...</span>
                    </div>
                )}
            </div>

            <div className="relative">
        <textarea
            value={value}
            onChange={handleChange}
            disabled={loadingState === "loading"}
            rows={12}
            placeholder="Enter your text here to adjust its tone..."
            className="w-full rounded-lg border border-gray-700 p-4 text-sm focus:outline-none focus:ring-1 focus:ring-white disabled:opacity-50 bg-gray-900 resize-none font-sans text-gray-100"
            style={{
                caretColor: 'white',
                transition: 'all 0.2s ease'
            }}
        />

                {loadingState === "loading" && (
                    <div className="absolute inset-0 bg-gray-900 bg-opacity-20 flex items-center justify-center rounded-lg">
                        <div className="w-8 h-8 border-4 border-gray-700 border-t-white rounded-full animate-spin"></div>
                    </div>
                )}
            </div>

        </div>
    );
}
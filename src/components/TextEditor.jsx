import React, { useState, useEffect } from "react";

export function TextEditor({ value, onChange, loadingState }) {
    const defaultText = `Hey there! This is a sample paragraph to get you started. It's here to give you an idea of how your content might look before you start typing your own text. Feel free to adjust it as needed. The tone of this content can be modified to be more formal or casual, depending on the settings you choose.`;

    useEffect(() => {
        if (!value) {
            onChange(defaultText);
        }
    }, [value, onChange]);

    const handleChange = (e) => {
        onChange(e.target.value);
    };

    return (
        <div className="bg-white rounded-2xl shadow p-6 w-full space-y-4 border-2 border-gray-300">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Text Editor</h3>
                {loadingState === "loading" && (
                    <div className="flex items-center space-x-2 text-sm text-gray-700">
                        <div className="w-4 h-4 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
                        <span>Generating...</span>
                    </div>
                )}
            </div>

            <textarea
                value={value}
                onChange={handleChange}
                disabled={loadingState === "loading"}
                rows={12}
                placeholder="Enter your text here to adjust its tone..."
                className="w-full rounded-lg border border-gray-300 p-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 bg-gray-50 resize-none font-sans italic"
            />
        </div>
    );
}

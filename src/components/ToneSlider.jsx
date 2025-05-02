import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";

export function ToneSlider({
                               value,
                               onValueChange,
                               onReset,
                               loadingState,
                               onUndo,
                               onRedo,
                               canUndo,
                               canRedo
                           }) {
    const [localValue, setLocalValue] = useState(value);

    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (localValue !== value) {
                onValueChange(localValue);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [localValue, onValueChange, value]);

    const handleSliderChange = (e) => {
        setLocalValue(Number(e.target.value));
    };

    return (
        <div className="border border-gray-700 rounded-xl p-6 shadow-lg bg-black text-white flex flex-col gap-4 min-w-[280px]">
            <div className="flex justify-between items-center mb-2">
                <h6 className="font-semibold text-lg tracking-tight">Adjust Tone</h6>
                <div className="flex gap-2">
                    <button
                        onClick={onUndo}
                        disabled={!canUndo}
                        className={`p-2 rounded-full hover:bg-gray-800 transition-colors ${
                            !canUndo ? "opacity-30 cursor-not-allowed" : ""
                        }`}
                        aria-label="Undo"
                    >
                        <ArrowLeft size={18} />
                    </button>
                    <button
                        onClick={onRedo}
                        disabled={!canRedo}
                        className={`p-2 rounded-full hover:bg-gray-800 transition-colors ${
                            !canRedo ? "opacity-30 cursor-not-allowed" : ""
                        }`}
                        aria-label="Redo"
                    >
                        <ArrowRight size={18} />
                    </button>
                    <button
                        onClick={onReset}
                        className="p-2 rounded-full hover:bg-gray-800 transition-colors"
                        aria-label="Reset"
                    >
                        <RotateCcw size={18} />
                    </button>
                </div>
            </div>

            <div className="flex justify-between mb-1 text-sm text-gray-400 font-medium px-1">
                <span>Formal</span>
                <span>Casual</span>
            </div>

            <div className="relative py-2">
                <input
                    type="range"
                    value={localValue}
                    onChange={handleSliderChange}
                    min={0}
                    max={100}
                    step={1}
                    disabled={loadingState === "loading"}
                    className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer disabled:opacity-50"
                    style={{
                        background: `linear-gradient(to right, white ${localValue}%, gray ${localValue}%)`,
                        accentColor: "white"
                    }}
                />
            </div>

            {loadingState === "loading" && (
                <div className="flex justify-center py-2">
                    <p className="text-sm text-gray-400 animate-pulse">Adjusting tone...</p>
                </div>
            )}

            <div className="text-center">
                {loadingState === "success" && (
                    <p className="text-white-400 text-sm">Tone adjusted successfully</p>
                )}
                {loadingState === "error" && (
                    <p className="text-red-400 text-sm">Failed to adjust tone</p>
                )}
            </div>
        </div>
    );
}
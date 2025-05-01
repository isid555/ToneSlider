import React, { useState, useEffect } from "react";
import { Slider, IconButton, Tooltip } from "@mui/material";
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

    const handleSliderChange = (_, newValue) => {
        setLocalValue(newValue);
    };

    return (
        <div className="border-2 border-gray-300 rounded-xl p-4 shadow-md flex flex-col gap-4 min-w-[280px]">
            <div className="flex justify-between items-center mb-4">
                <h6 className="font-semibold text-lg">Adjust Tone</h6>
                <div className="flex gap-2">
                    <Tooltip title="Undo">
                        <span>
                            <IconButton
                                onClick={onUndo}
                                disabled={!canUndo}
                                sx={{ opacity: canUndo ? 1 : 0.3 }}
                            >
                                <ArrowLeft size={18} />
                            </IconButton>
                        </span>
                    </Tooltip>
                    <Tooltip title="Redo">
                        <span>
                            <IconButton
                                onClick={onRedo}
                                disabled={!canRedo}
                                sx={{ opacity: canRedo ? 1 : 0.3 }}
                            >
                                <ArrowRight size={18} />
                            </IconButton>
                        </span>
                    </Tooltip>
                    <Tooltip title="Reset">
                        <IconButton onClick={onReset}>
                            <RotateCcw size={18} />
                        </IconButton>
                    </Tooltip>
                </div>
            </div>

            <div className="flex justify-between mb-2 text-sm text-gray-500">
                <span>Formal</span>
                <span>Casual</span>
            </div>

            <Slider
                value={localValue}
                onChange={handleSliderChange}
                min={0}
                max={100}
                step={1}
                disabled={loadingState === "loading"}
                sx={{
                    '& .MuiSlider-thumb': {
                        backgroundColor: "#000",
                    },
                    '& .MuiSlider-track': {
                        backgroundColor: "#333",
                    },
                    '& .MuiSlider-rail': {
                        backgroundColor: "#666",
                    },
                    opacity: loadingState === "loading" ? 0.6 : 1
                }}
            />

            {loadingState === "loading" && (
                <div className="flex justify-center py-2">
                    <p className="text-sm text-gray-600 animate-pulse">Adjusting tone...</p>
                </div>
            )}

            <div className="text-center">
                {loadingState === "success" && (
                    <p className="text-green-700 text-sm">Tone adjusted successfully</p>
                )}
                {loadingState === "error" && (
                    <p className="text-red-700 text-sm">Failed to adjust tone</p>
                )}
            </div>
        </div>
    );
}

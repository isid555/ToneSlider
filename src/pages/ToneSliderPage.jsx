import React from "react";
import { TextEditor } from "../components/TextEditor.jsx";
import { ToneSlider } from "../components/ToneSlider.jsx";
import { useToneAdjustment } from "../hooks/useToneAdjustment";

export function ToneSliderPage() {
    const {
        content,
        toneLevel,
        updateContent,
        adjustTone,
        loadingState,
        undo,
        redo,
        reset,
        canUndo,
        canRedo
    } = useToneAdjustment();

    return (
        <section id="home">
            <div className="relative min-h-screen bg-black overflow-hidden flex flex-col items-center justify-center p-6">

                <div
                    className="absolute inset-0 z-0 pointer-events-none opacity-20"
                    style={{
                        backgroundImage: ` 
                        linear-gradient(to right, rgba(255,255,255,0.3) 2px, transparent 1px),
                        linear-gradient(to bottom, rgba(255,255,255,0.3) 2px, transparent 1px)
            `,
                        backgroundSize: '40px 40px',
                    }}
                />


                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-60 z-0 pointer-events-none"></div>

                <div className="absolute top-1/4 -left-32 w-90 h-90 bg-yellow-500 rounded-full filter blur-3xl opacity-0 animate-pulse"></div>
                <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-green-500 rounded-full filter blur-3xl opacity-0 animate-pulse" style={{animationDelay: '1s'}}></div>

                <div className="text-center text-white mb-10 z-10 max-w-4xl">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">
                        Refine Your <span
                        className="bg-gradient-to-r from-blue-400 via-cyan-200 to-blue-500 bg-clip-text text-transparent">Text</span> with
                        AI Precision
                    </h1>
                    <p className="text-lg text-gray-300 mt-4 mx-auto max-w-3xl">
                        Adjust the <span
                        className="bg-gradient-to-r from-pink-400 to-pink-500 bg-clip-text text-transparent">tone</span> of
                        your text and instantly refine it. Move between formal and casual styles with a simple slider.
                        You can also <span className="text-white font-medium">undo</span>, <span
                        className="text-white font-medium">redo</span>, or <span
                        className="text-white font-medium">reset</span> the tone back at any time.
                    </p>

                </div>

                <div className="flex flex-col lg:flex-row gap-8 items-start justify-center w-full max-w-7xl z-10">
                    <div className="w-full lg:w-2/3 shadow-2xl">
                        <TextEditor
                            value={content}
                            onChange={updateContent}
                            loadingState={loadingState}
                        />
                    </div>

                    <div className="w-full lg:w-1/3 shadow-2xl">
                        <ToneSlider
                            value={toneLevel}
                            onValueChange={adjustTone}
                            onReset={reset}
                            loadingState={loadingState}
                            onUndo={undo}
                            onRedo={redo}
                            canUndo={canUndo}
                            canRedo={canRedo}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
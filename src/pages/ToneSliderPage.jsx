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
        <section id={"home"}>
            <div
                className="relative min-h-screen bg-black overflow-hidden flex flex-col items-center justify-center p-6">
                <div
                    className="absolute inset-0 z-0 pointer-events-none"
                    style={{
                        backgroundImage: `
                        linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
                    `,
                        backgroundSize: '50px 50px',
                    }}
                />

                <div className="text-center text-white mb-8">
                    <h1 className="text-3xl md:text-4xl font-extrabold">
                        Refine Your <span
                        className="bg-gradient-to-r from-blue-400 via-cyan-200 to-blue-500 bg-clip-text text-transparent">Text</span> with
                        AI Precision
                    </h1>
                    <p className="text-lg text-gray-300 mt-4">
                        Adjust the <span
                        className="bg-gradient-to-r from-pink-400 via-white-200 to-pink-500 bg-clip-text text-transparent">tone</span> of
                        your text and instantly refine it for a more professional, casual, or clear message.
                        You can <span
                        className="bg-gradient-to-r from-yellow-300 via-yellow-100 to-yellow-400 bg-clip-text text-transparent">undo</span> and <span
                        className="bg-gradient-to-r from-teal-300 via-cyan-100 to-teal-500 bg-clip-text text-transparent">redo</span> your
                        changes, or <span
                        className="bg-gradient-to-r from-purple-400 via-indigo-300 to-purple-500 bg-clip-text text-transparent">reset</span> to
                        the default version whenever needed.
                    </p>
                </div>

                <div className="flex flex-col md:flex-row gap-8 items-center justify-center w-full max-w-7xl">
                    <div className="w-full md:w-2/3 bg-white rounded-2xl shadow-md p-4">
                        <TextEditor
                            value={content || " "}
                            onChange={updateContent}
                            loadingState={loadingState}
                        />
                    </div>

                    <div className="w-full md:w-1/3 bg-white rounded-2xl shadow-md p-4">
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

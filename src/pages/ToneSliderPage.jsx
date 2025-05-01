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
        <div className="p-6 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 items-start">
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
    );
}

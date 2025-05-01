import { useState, useCallback, useEffect } from 'react';
import { useUndoRedo } from './useUndoRedo';
import { adjustTone } from './mistral.js';
import { toast } from 'sonner';


const adjustToneFunction = adjustTone;

const defaultText = `Hey there! This is a sample paragraph to get you started. It's here to give you an idea of how your content might look before you start typing your own text. Feel free to adjust it as needed. The tone of this content can be modified to be more formal or casual, depending on the settings you choose.`;


export function useToneAdjustment(initialContent = defaultText) {
    const initialState = { content: initialContent, toneLevel: 50 };
    const { state, setState, undo, redo, reset, canUndo, canRedo } = useUndoRedo(initialState);
    const [loadingState, setLoadingState] = useState('idle');


    useEffect(() => {
        const savedState = localStorage.getItem('toneSliderState');
        if (savedState) {
            try {
                const parsed = JSON.parse(savedState);
                setState(parsed);
            } catch (e) {
                console.error('Failed to parse saved state', e);
            }
        }
    }, []);


    useEffect(() => {
        localStorage.setItem('toneSliderState', JSON.stringify(state));
    }, [state]);

    const updateContent = useCallback((content) => {
        setState({ ...state, content });
    }, [state, setState]);

    const adjustTone = useCallback(async (newToneLevel) => {
        if (!state.content.trim() || newToneLevel === state.toneLevel) {
            return;
        }

        setLoadingState('loading');

        try {
            const result = await adjustToneFunction(state.content, newToneLevel);

            if (result.error) {
                throw new Error(result.error);
            }

            setState({
                content: result.content,
                toneLevel: newToneLevel
            });

            setLoadingState('success');
        } catch (error) {
            setLoadingState('error');
            toast.error('Failed to adjust tone. Please try again.');
            console.error('Error adjusting tone:', error);
        }
    }, [state, setState]);

    const handleReset = useCallback(() => {
        reset();
        toast('Text reset to original state', {
            description: 'Tone level has been reset to neutral (50)',
        });
    }, [reset]);

    return {
        content: state.content,
        toneLevel: state.toneLevel,
        updateContent,
        adjustTone,
        loadingState,
        undo,
        redo,
        reset: handleReset,
        canUndo,
        canRedo,
    };
}

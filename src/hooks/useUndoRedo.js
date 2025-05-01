import { useState, useCallback } from 'react';

export function useUndoRedo(initialState) {
    const [history, setHistory] = useState([initialState]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const setState = useCallback((newState) => {
        setHistory(prev => {
            const newHistory = prev.slice(0, currentIndex + 1);
            return [...newHistory, newState];
        });
        setCurrentIndex(prev => prev + 1);
    }, [currentIndex]);

    const undo = useCallback(() => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    }, [currentIndex]);

    const redo = useCallback(() => {
        if (currentIndex < history.length - 1) {
            setCurrentIndex(prev => prev + 1);
        }
    }, [currentIndex, history.length]);

    const reset = useCallback(() => {
        if (history.length > 0) {
            setCurrentIndex(0);
        }
    }, [history.length]);

    const canUndo = currentIndex > 0;
    const canRedo = currentIndex < history.length - 1;

    return {
        state: history[currentIndex],
        setState,
        undo,
        redo,
        reset,
        canUndo,
        canRedo,
    };
}

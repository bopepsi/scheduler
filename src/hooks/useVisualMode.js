import { useState } from "react";

export const useVisualMode = function (initial) {
    const [mode, setMode] = useState(initial);
    const [history, setHistory] = useState([initial]);

    const transition = function (value, replace = false) {
        var temp = history;
        setMode(value);
        if (!replace) return setHistory(prev=>([...prev, value]));
        temp[temp.length - 1] = value;
        if (replace) setHistory(prev=>([...temp]));
    }

    const back = function () {
        var temp = history;
        if (history.length <= 1) return setMode(history[0]);
        temp.pop();
        setMode(history[history.length-1]);
        setHistory(prev=>([...temp]));
    }

    return { mode, transition, back, setMode }
}
import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newmode, replace = false) {
    setMode(newmode);
    setHistory((prev) => {
      if (replace) {
        return [...prev.slice(0, prev.length - 1), newmode];
      }
      return [...prev, newmode];
    });
  }

  function back() {
    // console.log("entering back()", history, "history length:", history.length);
    if (history.length > 1) {
      // console.log("entering the if");

      let newHistory = history; //can only be [first, second, third]
      // console.log("initial newHistory:", "newH:", newHistory, "mode:", mode);
      newHistory.pop();
      // console.log("after popping newHistory:", "newH:", newHistory, "mode:", mode);
      setHistory(newHistory);
      // console.log("setting history:", "newH:", newHistory, "mode:", mode);
      setMode(newHistory[newHistory.length - 1]);
      // console.log("setting mode:", "newH:", newHistory, "mode:", mode);
    }
  }
  return { mode, transition, back };
}

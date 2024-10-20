import { useState, useRef } from "react";
import { applyStyle } from "./apply-style";

export default function useEditor() {
  const [text, setText] = useState(
    "<i>Test text</i> <b>For</b> <u>Formatting</u>"
  );
  const [selectionStart, setSelectionStart] = useState(0);
  const [selectionEnd, setSelectionEnd] = useState(0);

  const textRef = useRef(null);

  const updateSelections = () => {
    if (!textRef.current) return;

    setSelectionStart(textRef.current.selectionStart);
    setSelectionEnd(textRef.current.selectionEnd);
  };

  const applyFormat = (type) => {
    const selectedText = text.substring(selectionStart, selectionEnd);
    if (!selectedText) return;

    const before = text.substring(0, selectionStart); // текст слева от выделенного фрагемента
    const after = text.substring(selectionEnd); // текст справа от выделенного фрагемента

    setText(before + applyStyle(type, selectedText) + after);
  };

  return { textRef, applyFormat, updateSelections, text, setText };
}

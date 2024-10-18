import { useState, useRef } from "react";
import parse from "html-react-parser";
import styles from "./EmailEditor.module.scss";
import { Bold, Eraser, Italic, Underline } from "lucide-react";
import { applyStyle } from "./apply-style";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { emailService } from "../../services/email-service";

export default function EmailEditor() {
  const [text, setText] = useState(
    "<i>Test text</i> <b>For</b> <u>Formatting</u>"
  );

  const [selectionStart, setSelectionStart] = useState(0);
  const [selectionEnd, setSelectionEnd] = useState(0);

  const textRef = useRef(null);

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["create email"],
    mutationFn: () => emailService.sendEmail(text),
    onSuccess() {
      setText("");
      queryClient.refetchQueries({
        queryKey: ["email list"],
      });
    },
  });

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

  return (
    <>
      <div className={styles.card}>
        <span>Preview text</span>
        <br />
        {text && <div className={styles.preview}>{parse(text)}</div>}

        <textarea
          ref={textRef}
          className={styles.editor}
          spellCheck="false"
          onClick={updateSelections}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className={styles.actions}>
          <div className={styles.tools}>
            <button onClick={() => setText("")}>
              <Eraser />
            </button>
            <button onClick={() => applyFormat("bold")}>
              <Bold />
            </button>
            <button onClick={() => applyFormat("italic")}>
              <Italic />
            </button>
            <button onClick={() => applyFormat("underline")}>
              <Underline />
            </button>
          </div>
          <button
            disabled={isPending}
            onClick={() => {
              mutate();
            }}
          >
            Send now
          </button>
        </div>
      </div>
    </>
  );
}

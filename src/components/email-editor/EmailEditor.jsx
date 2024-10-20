import parse from "html-react-parser";
import styles from "./EmailEditor.module.scss";
import { Bold, Eraser, Italic, Underline } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { emailService } from "../../services/email-service";
import useEditor from "./useEditor";

export default function EmailEditor() {
  const { textRef, applyFormat, updateSelections, text, setText } = useEditor();

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

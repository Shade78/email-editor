import styles from "./EmailEditor.module.scss";
import { Bold, Eraser, Italic, Underline } from "lucide-react";

export default function EmailEditor() {
  return (
    <>
      <h1>Email editor</h1>
      <div className={styles.card}>
        <textarea
          className={styles.editor}
          placeholder="Write your message here"
        >
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti,
          consequatur!
        </textarea>
        <div className={styles.actions}>
          <div className={styles.tools}>
            <button>
              <Eraser />
            </button>
            <button>
              <Bold />
            </button>
            <button>
              <Italic />
            </button>
            <button>
              <Underline />
            </button>
          </div>
          <button>Send now</button>
        </div>
      </div>
    </>
  );
}

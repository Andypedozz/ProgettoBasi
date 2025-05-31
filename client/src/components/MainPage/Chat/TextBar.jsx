import { useState } from "react";
import styles from "./TextBar.module.css";

export default function TextBar({ onSend }) {
    const [text, setText] = useState("");

    const handleSend = () => {
        const trimmed = text.trim();
        if (trimmed !== "") {
            onSend(trimmed);
            setText("");
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className={styles.textBarContainer}>
            <textarea
                className={styles.textInput}
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Scrivi un messaggio"
                rows={1}
            />
            <button className={styles.sendButton} onClick={handleSend}>
                ➤
            </button>
        </div>
    );
}

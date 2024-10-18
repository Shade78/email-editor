import { useQuery } from "@tanstack/react-query";
import React from "react";
import { emailService } from "../../services/email-service";
import parse from "html-react-parser";
import styles from "./EmailList.module.scss";

export default function EmailList() {
  const { data } = useQuery({
    queryKey: ["email list"],
    queryFn: () => emailService.getEmails(),
  });

  return (
    <>
      <div className={styles.list}>
        <span>Sended emails:</span>
        <div>
          {data?.map((email) => (
            <div key={email.text}>{parse(email.text)}</div>
          ))}
        </div>
      </div>
    </>
  );
}

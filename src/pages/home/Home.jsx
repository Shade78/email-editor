import React from "react";
import EmailEditor from "../../components/email-editor/EmailEditor";
import EmailList from "../../components/email-list/EmailList";

import styles from "./Home.module.scss";

function Home() {
  return (
    <>
      <h1>Email editor</h1>
      <div className={styles.container}>
        <EmailEditor />
        <EmailList />
      </div>
    </>
  );
}

export default Home;

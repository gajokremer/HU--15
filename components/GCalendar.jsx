import React from "react";
import styles from "../styles/GCalendar.module.css";

const GCalendar = () => {
  try {
    return (
      <div className={styles.calendar}>
        <iframe
          src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=America%2FBogota&showTitle=0&showNav=1&showPrint=0&showTabs=1&mode=WEEK&src=ZjlmOGZkZDJiNjllY2EwNWU1MjcwZWMzYTgxY2VhNDg5NzBhZTRhZWE2NTdhOWNmNDBlZmRiZWU5MGRlODEzY0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23F4511E"
          // style="border:solid 1px #777"
          width="800"
          height="600"
          frameborder="0"
          scrolling="no"
        ></iframe>
      </div>
    );
  } catch (error) {
    console.error(error);
  }
};

export default GCalendar;

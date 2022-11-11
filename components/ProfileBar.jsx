import Image from "next/image";
import React from "react";
import styles from "../styles/ProfileBar.module.css";

const ProfileBar = ({ name, role }) => {
  return (
    <>
      <div className={styles.information_section}>
        {/* <div className={styles.user_information}>
          <div className={styles.profile_picture_container}>
            <Image
              priority
              src="/img/profilePicture.jpeg"
              height={140}
              width={140}
              id={styles.profile_picture}
              alt="profile.picture"
            ></Image>
          </div>
          <div className={styles.user_data_container}>
            <div>
              <span id={styles.user_name}>{name}</span>
            </div>
            <div>
              <span id={styles.user_role}>{role}</span>
            </div>
          </div>
        </div> */}

        <div className={styles.events_information}>
          <span>
            <strong>List of events</strong>
          </span>
          <div>
            <ul id={styles.event_list}>
              <li>First event</li>
              <li>Second event</li>
              <li>Third event</li>
              <li>Fourth event</li>
              <li>Fifth event</li>
            </ul>
            <ul id={styles.colors_list}>
              <li />
              <li />
              <li />
              <li />
              <li />
            </ul>
          </div>
        </div>
      </div>

      {/* <div className={styles.schedule_section}>
        <div className={styles.month}>January</div>
        <div className={styles.day_section}>
          <div className={styles.day_picker}>
            <span className={styles.day_change} id={styles.prev_day}>
              <pre>&lt;</pre>
            </span>
            <span className={styles.week}>Week 1</span>
            <span className={styles.day_change} id={styles.next_day}>
              <pre>&gt;</pre>
            </span>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default ProfileBar;

import Image from "next/image";
import React from "react";
import Styles from "../styles/ProfileBar.module.css";

const ProfileBar = () => {
  return (
    <>
      <div className={Styles.information_section}>
        <div className={Styles.user_information}>
          <div className={Styles.profile_picture_container}>
            <Image
              priority
              src="/img/profilePicture.jpeg"
              height={140}
              width={140}
              id={Styles.profile_picture}
              alt="profile.picture"
            ></Image>
          </div>
          <div className={Styles.user_data_container}>
            <div>
              <span id={Styles.user_name}>Gabriel Kremer</span>
            </div>
            <div>
              <span id={Styles.user_role}>Student</span>
            </div>
          </div>
        </div>

        <div className={Styles.events_information}>
          <span>
            <strong>List of events</strong>
          </span>
          <div>
            <ul id={Styles.event_list}>
              <li>First event</li>
              <li>Second event</li>
              <li>Third event</li>
              <li>Fourth event</li>
              <li>Fifth event</li>
            </ul>
            <ul id={Styles.colors_list}>
              <li />
              <li />
              <li />
              <li />
              <li />
            </ul>
          </div>
        </div>
      </div>

      {/* <div className={Styles.schedule_section}>
        <div className={Styles.month}>January</div>
        <div className={Styles.day_section}>
          <div className={Styles.day_picker}>
            <span className={Styles.day_change} id={Styles.prev_day}>
              <pre>&lt;</pre>
            </span>
            <span className={Styles.week}>Week 1</span>
            <span className={Styles.day_change} id={Styles.next_day}>
              <pre>&gt;</pre>
            </span>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default ProfileBar;

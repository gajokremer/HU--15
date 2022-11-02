// import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import ProfileBar from "../components/ProfileBar";
import Schedule from "../components/Schedule";

export default function Home() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/api/hello")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No table data</p>;

  // console.log("Data");
  // console.log(data);

  return (
    <div>
      <Header></Header>
      <ProfileBar name={"Gabriel Kremer"} role={"Student"}></ProfileBar>
      <Schedule props={data} today={new Date()}></Schedule>
    </div>
  );
}

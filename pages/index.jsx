// import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import ReferenceBar from "../components/ReferenceBar";
import Schedule from "../components/Schedule";

export default function Home() {
  // const [data, setData] = useState(null);
  // const [isLoading, setLoading] = useState(false);

  // useEffect(() => {
  //   setLoading(true);
  //   fetch("/api/hello", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ name: "John Doe" }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setData(data);
  //       setLoading(false);
  //     });
  // }, []);

  // if (isLoading) return <p>Loading...</p>;
  // if (!data) return <p>No table data</p>;

  const data = null;

  return (
    <div>
      <Header></Header>
      <ReferenceBar name={"Gabriel Kremer"} role={"Student"}></ReferenceBar>
      <Schedule info={data} today={new Date()}></Schedule>
    </div>
  );
}

import React, { useEffect } from "react";

const Stats = () => {
  useEffect(() => {
    fetch("http://localhost:3000/stats", {
      // TODO configure URL
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("stats", data);
      });
  });

  return <div></div>;
};

export default Stats;

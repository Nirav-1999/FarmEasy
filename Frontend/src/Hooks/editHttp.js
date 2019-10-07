import { useState } from "react";
export const useEditHttp = () => {
//   const [fetchData, setFetchedData] = useState(null);
  const [message, setMessage] = useState("");

  async function fetchCall(url) {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await res.json();
    console.log(data);
    if (res) {
      if (res.status === 200) {
          setMessage(data.Regions)
      }
    }
  }
  return [message, fetchCall];
};

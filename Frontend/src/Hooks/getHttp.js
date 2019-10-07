import { useState } from "react";
export const useGetHttp = () => {
//   const [fetchData, setFetchedData] = useState(null);
  const [messageGet, setMessage] = useState("");

  async function fetchGetCall(url) {
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
          setMessage(data)
      }
    }
  }
  return [messageGet, fetchGetCall];
};

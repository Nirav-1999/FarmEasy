import { useState } from "react";
export const usePostHttp = () => {
  const [yearRain, setYearRain] = useState();

  async function fetchPostCall(url, body) {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: body
    });
    const data = await res.json();
    return data;
  }
  return [yearRain, fetchPostCall];
};

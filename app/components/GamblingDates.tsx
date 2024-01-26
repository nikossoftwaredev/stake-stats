"use client";

import { useEffect, useState } from "react";

const startDate = new Date(2022, 8, 2);
const endDate = new Date(2024, 0, 26);

const calculateTimeFromNow = (endDate: Date) => {
  const currentDate = new Date();

  const timeDifference = currentDate.getTime() - endDate.getTime();

  // Convert milliseconds to days, hours, minutes, and seconds
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
  return `${days} DAYS - ${hours} HOURS - ${minutes} MINUTES - ${seconds} SECONDS.`;
};

const GamblingDates = () => {
  const [timeFromNow, setTimeFromNow] = useState(calculateTimeFromNow(endDate));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeFromNow(calculateTimeFromNow(endDate));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);
  return (
    <>
      Showing stats for <strong>No0dle2000</strong> from{" "}
      {startDate.toLocaleDateString()} to {endDate.toLocaleDateString()}
      <br />
      Gambling free for <strong>{timeFromNow}</strong>
    </>
  );
};

export default GamblingDates;

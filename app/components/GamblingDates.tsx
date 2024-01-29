"use client";

import { useEffect, useState } from "react";
import { endDate } from "../config";

const addPadStart = (num: number) => num.toString().padStart(2, "0");
const calculateTimeFromNow = (endDate: Date) => {
  const currentDate = new Date();

  const timeDifference = currentDate.getTime() - endDate.getTime();

  // Convert milliseconds to days, hours, minutes, and seconds
  const days = addPadStart(Math.floor(timeDifference / (1000 * 60 * 60 * 24)));

  const hours = addPadStart(
    Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  );

  const minutes = addPadStart(
    Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60))
  );
  const seconds = addPadStart(
    Math.floor((timeDifference % (1000 * 60)) / 1000)
  );

  return { days, hours, minutes, seconds };
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
      Showing stats for <strong className="text-green-500">No0dle2000</strong>
      <br />
      <div className="stat-title text-2xl mb-2"> Gambling free for</div>
      <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
          <span className="countdown font-mono text-5xl">
            {timeFromNow.days}
          </span>
          days
        </div>
        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
          <span className="countdown font-mono text-5xl">
            {timeFromNow.hours}
          </span>
          hours
        </div>
        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
          <span className="countdown font-mono text-5xl">
            {timeFromNow.minutes}
          </span>
          min
        </div>
        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
          <span className="countdown font-mono text-5xl">
            {timeFromNow.seconds}
          </span>
          sec
        </div>
      </div>
      <br />
    </>
  );
};

export default GamblingDates;

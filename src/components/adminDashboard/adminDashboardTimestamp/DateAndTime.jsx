import { useState, useEffect } from "react";

function DateAndTime() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentTime.toLocaleDateString(undefined, {
    weekday: "long", // Display full weekday (e.g., "Wednesday")
    day: "numeric", // Display day as a number (e.g., "16")
    month: "long", // Display full month (e.g., "October")
    year: "numeric", // Display full year (e.g., "2024")
  });

  const formattedTime = currentTime.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  return (
    <div className="text-white text-3xl">
      <span className="px-[50px]">{formattedDate}</span>
      <span className="px-[50px]">{formattedTime}</span>
    </div>
  );
}

export default DateAndTime;

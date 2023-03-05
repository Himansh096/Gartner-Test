import React, { useState } from "react";
import clicks from "./clicks.json";

export default function App() {
  const [filteredClicks, setFilteredClicks] = useState([]);
  function filterClicks(clicks) {
    const filteredClicks = {};
    const clickCounts = {};

    // Count clicks for each IP
    clicks.forEach((click) => {
      const { ip } = click;
      if (ip in clickCounts) {
        clickCounts[ip]++;
      } else {
        clickCounts[ip] = 1;
      }
    });

    // Filter clicks based on conditions
    clicks.forEach((click) => {
      const { ip, timestamp, amount } = click;
      const date = new Date(timestamp);
      const hour = date.getHours();
      const key = `${ip}_${hour}`;

      if (clickCounts[ip] > 10) {
        return;
      }

      if (key in filteredClicks) {
        const prevAmount = filteredClicks[key].amount;
        const prevTimestamp = filteredClicks[key].timestamp;
        if (amount > prevAmount) {
          filteredClicks[key] = { ip, timestamp, amount };
        } else if (amount === prevAmount && new Date(prevTimestamp) > date) {
          filteredClicks[key] = { ip, timestamp, amount };
        }
      } else {
        filteredClicks[key] = { ip, timestamp, amount };
      }
    });

    return setFilteredClicks(Object.values(filteredClicks));
  }

  return (
    <div className="App">
      <button onClick={() => filterClicks(clicks)}>Filter Clicks</button>
      {filteredClicks.map((click) => (
        <div key={click.timestamp}>
          IP: {click.ip}, Timestamp: {click.timestamp}, Amount: {click.amount}
        </div>
      ))}
    </div>
  );
}

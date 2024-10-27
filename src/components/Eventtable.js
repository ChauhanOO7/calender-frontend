// src/EventTable.js
import React from 'react';

const Eventtable = ({ events }) => {
  return (
    <table style={{marginTop:'30px',width:'100%'}}>
      <thead>
        <tr>
          <th>Event Name</th>
          <th>Date</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        {events.map((event,index) => (
          <tr key={index}>
            <td style={{ maxWidth: "250px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{event.title}</td>
            <td>{event.date}</td>
            <td>{event.time}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Eventtable;

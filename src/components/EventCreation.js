import React, { useState } from 'react';
import Eventtable from './Eventtable';

const EventCreation = ({ accessToken }) => {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [success, setSuccess] = useState(false);
  const [events,setEvents]=useState([]);
  const [table,settable]=useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const eventDateTime = new Date(`${eventDate}T${eventTime}`).toISOString();

    const event = {
      summary: eventName,
      start: {
        dateTime: eventDateTime,
        timeZone: 'UTC',
      },
      end: {
        dateTime: new Date(new Date(eventDateTime).getTime() + 60 * 60 * 1000).toISOString(), // 1 hour duration
        timeZone: 'UTC',
      },
    };

    try {
      // sending data to google calender api or storing data over there.
      const response = await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events?key=AIzaSyDXin55RK-fyMFmlGHV6vdRr3hUIRjGJ0o", {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      });

      if (response.ok) {
        setSuccess(true);
        setEventName('');
        setEventDate('');
        setEventTime('');
      }
      setTimeout(() => {
        setSuccess(false);
      }, 2000);
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const fetchEvents = async () => {
    settable(true);
    // getting stored data from google calender api.
    const res = await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events?key=AIzaSyDXin55RK-fyMFmlGHV6vdRr3hUIRjGJ0o",{
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }});

      const response=await res.json();
      const wholeevents=[];
      const data = Array.from(response.items);
      data.forEach((info)=>{
        const dateObject = new Date(info.start.dateTime);
          // Format the date in a readable way
          const formattedDate = dateObject.toLocaleDateString("en-GB", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }); // e.g., "28 October 2024"

          // Format the time in a readable way
          const formattedTime = dateObject.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true, // Use 12-hour format
          });
        const event={
          title:info.summary,
          date:formattedDate,
          time:formattedTime
        }
        wholeevents.push(event);
      })

      setEvents(wholeevents);
  };

  return (
    <div className="event-creation-container">
      <h2>Create Calendar Event</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Event Name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          required
        />
        <input
          type="date"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
          required
        />
        <input
          type="time"
          value={eventTime}
          onChange={(e) => setEventTime(e.target.value)}
          required
        />
        <button type="submit">Create Event</button>
      </form>
      {success && <p className="success-message">Event created successfully!</p>}

      <button style={{marginTop:'20px'}} onClick={fetchEvents}>Fetch Events</button>
      {table ? <Eventtable events={events}/> : ""}
    </div>
  );
};

export default EventCreation;

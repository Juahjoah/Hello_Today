import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

const events = [{ title: "Meeting", start: new Date() }];

export function ProfileCalender() {
  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        weekends={true}
        events={events}
        eventContent={renderEventContent}
        fixedWeekCount={false}
          height={"300px"}
        // dayMinWidth={"50px"}
        expandRows={false}
        editable={true}
        selecttable={true}
      />
    </div>
  );
}

// a custom render function
function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

export default ProfileCalender;

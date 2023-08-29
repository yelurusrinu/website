import { useState } from "react";
import type { GetServerSideProps, NextPage } from "next";
import { CalendarScheduler } from "../components/CalendarScheduler";
import { mapArrayEventCalendar } from "../domain/EventCalendar";
import { getAllEventsCalendar } from "../services/eventCalendarApi";

interface IHomeProps {
  listAllEventsCalendar?: any;
}

const Appointment = ({ listAllEventsCalendar }: IHomeProps) => {
  const [listEventsCalendar, setListEventsCalendar] = useState<any[]>(
    listAllEventsCalendar
  );

  return <CalendarScheduler eventsCalendar={listEventsCalendar} />;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const eventsCalendar = await getAllEventsCalendar();
  const listAllEventsCalendar = mapArrayEventCalendar(eventsCalendar);

  return {
    props: {
      listAllEventsCalendar: listAllEventsCalendar ?? [],
    },
  };
};

export default Appointment;

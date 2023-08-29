import { Button, Divider, FormControlLabel, FormLabel, Grid, Modal, Radio, RadioGroup, TextField } from "@mui/material";
import { CalendarApi } from "@fullcalendar/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  createEventCalendar,
  deleteEventCalendar,
  updateEventCalendar,
} from "../../services/eventCalendarApi";
import { BoxContainer, TimeSlots } from "./styles";
import { LocalizationProvider, MobileDateTimePicker } from "@mui/x-date-pickers"
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import moment from "moment";
interface IDuration {
  value: string;
}

interface IEventCalendaryProps {
  open: boolean;
  handleClose: () => void;
  eventInfos: any;
  isEditCard: boolean;
}

export const EventCalendar = ({
  handleClose,
  open,
  eventInfos,
  isEditCard,
}: IEventCalendaryProps) => {
  const [title, setTitle] = useState<string>("");
  const [duration, setDuration] = useState<IDuration>({
    value: "30",
  });
  const [estart, setEstart] = useState<Date>();

  useEffect(() => {
    if (isEditCard) {
      setTitle(eventInfos?.event?.title);
      setDuration({
        value: eventInfos?.event?.duration,
      });
    } else {
      setTitle("");
      setDuration({ value: "30" });
    }
  }, [eventInfos, isEditCard]);

  const handleSelectCardColor = (value: string) => {
    setDuration({
      value: value,
    });
  };

  const handleAddedEvent = async () => {
    try {
      const calendarApi: CalendarApi = eventInfos.view.calendar;

      console.log('eventInfos ', eventInfos)
      console.log('title ', title)
      console.log('duration ', duration)
      console.log('estart ', estart)
      console.log(' end date ', moment(estart).add({minutes:parseInt(duration.value)}))

      const startAt = estart || eventInfos.start
      const startAtStr = startAt.toISOString()
      const endAt = moment(estart).add({minutes:parseInt(duration.value || '30')})
      const endAtStr = endAt.toISOString()
      const eventCalendar = await createEventCalendar({
        eventCalendar: {
          title: title === "" ? "Booking appointment" : title,
          start: startAtStr,
          end: endAtStr,

          status: "active",
          location: "default",
          rcur: false,
          rspList: [],
        },
      });

      calendarApi.addEvent({
        id: eventCalendar._id,
        title: eventCalendar.title,
        start: eventCalendar.start,
        end: eventCalendar.endStr,
        status: "active",
        location: "default",
        rcur: false,
        rspList: [],
      });
    } catch (err) {
      toast.error("Error while booking appointment");
    } finally {
      setTitle("");
      setEstart(null)
      setDuration("")
      handleClose();
    }
  };

  const handleDeleteEvent = async () => {
    try {
      await deleteEventCalendar({ id: eventInfos.event.id });
      eventInfos.event.remove();
    } catch (error) {
      toast.error("Error while deleting booking");
    } finally {
      setTitle("");
      handleClose();
    }
  };

  const handleUpdatedEvent = async () => {
    try {
      const calendarApi: CalendarApi = eventInfos.view.calendar;

      const eventCalendarUpdated = {
        eventCalendar: {
          _id: eventInfos.event.id,
          title: title !== "" ? title : "Update Booking",
          start: eventInfos.event.startStr,
          end: eventInfos.event.endStr,
          status: "active",
          location: "default",
          rcur: false,
          rspList: [],
        },
      };

      const currentEvent = calendarApi.getEventById(eventInfos.event.id);

      if (currentEvent) {
        currentEvent.setProp("title", title !== "" ? title : "Booking");
      }

      await updateEventCalendar(eventCalendarUpdated);
    } catch (error) {
      toast.error("Error while Updating booking");
    } finally {
      setTitle("");
      setEstart(undefined)
      setDuration("")
      handleClose();
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <BoxContainer>
        <Grid>

        <TextField
          label={"Book an Appointment"}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />
        <div style={{margin:"30px"}}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <MobileDateTimePicker
                label="Event Start At"
                //inputFormat="E MMM dd yyyy HH:MM:SS O"
                value={estart}
                onChange={(newValue) => setEstart(newValue)}
                fullWidth
                //renderInput={(params) => <TextField {...params} fullWidth />} 
                />
        </LocalizationProvider>
        </div>
        <FormLabel id="demo-radio-buttons-group-label">Duration</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-evenly'
          }}
        >
          {[
            { value: "30", displayVal: "30 Mins" },
            { value: "60", displayVal: "60 Mins" },
          ].map((slot, index) => (
            <FormControlLabel
              key={index}
              onClick={() => handleSelectCardColor(slot.value)}
              value={slot.value}
              control={<Radio />}
              label={slot.displayVal}
            />)
          )}
        </RadioGroup>

        <Button
          variant="contained"
          fullWidth
          onClick={isEditCard ? handleUpdatedEvent : handleAddedEvent}
          sx={{ marginTop: "0.5rem" }}
        >
          {isEditCard ? "Edit Booking" : "Schedule Booking"}
        </Button>

        {isEditCard && (
          <Button
            variant="contained"
            fullWidth
            sx={{ marginTop: "0.5rem" }}
            onClick={handleDeleteEvent}
          >
            Delete Booking
          </Button>
        )}
        </Grid>
      </BoxContainer>
    </Modal>
  );
};

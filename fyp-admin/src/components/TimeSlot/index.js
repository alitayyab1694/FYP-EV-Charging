import React, { useState } from 'react';
import moment from 'moment';
import { useFormikContext } from "formik";

const CustomTimeSlotSelect = () => {
const {
    setFieldValue,
  } = useFormikContext();
  const [timeSlots, setTimeSlots] = useState([]);
  const [newSlot, setNewSlot] = useState({
    date: '',
    startTime: '',
    endTime: '',
  });
  const [validationError, setValidationError] = useState('');

  const handleInputChange = (e) => {
    setNewSlot({
      ...newSlot,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddSlot = () => {
    const { date, startTime, endTime } = newSlot;
    const slotExists = timeSlots.some((slot) => {
      const isSameDate = moment(slot.startTime).isSame(moment(`${date} ${startTime}`, 'YYYY-MM-DD HH:mm'));
      const isSameStartTime = moment(slot.startTime).isSameOrBefore(moment(`${date} ${startTime}`, 'YYYY-MM-DD HH:mm'));
      const isSameEndTime = moment(slot.endTime).isSameOrAfter(moment(`${date} ${endTime}`, 'YYYY-MM-DD HH:mm'));
      return isSameDate && isSameStartTime && isSameEndTime;
    });

    if (slotExists) {
      setValidationError('Slot already exists');
      return;
    }

    // Field validation
    if (moment(`${date} ${startTime}`, 'YYYY-MM-DD HH:mm').isAfter(moment(`${date} ${endTime}`, 'YYYY-MM-DD HH:mm'))) {
      setValidationError('Start time must be before end time');
      return;
    }

    const newTimeSlot = {
      id: timeSlots.length + 1,
      startTime: moment(`${date} ${startTime}`, 'YYYY-MM-DD HH:mm'),
      endTime: moment(`${date} ${endTime}`, 'YYYY-MM-DD HH:mm'),
    };

  setTimeSlots([...timeSlots, newTimeSlot]);
setFieldValue("slots" , [...timeSlots, newTimeSlot])
    setNewSlot({
      date: '',
      startTime: '',
      endTime: '',
    });
    setValidationError('');
  };

  const disablePastDates = (currentDate) => {
    const now = moment().startOf('day');
    return currentDate.isBefore(now);
  };

  return (
    <div className="custom-time-slot-select">
      <div className="time-slot-inputs">
        <input
          type="date"
          name="date"
          value={newSlot.date}
          onChange={handleInputChange}
          min={moment().format('YYYY-MM-DD')}
          disabled={timeSlots.length > 0}
        />
        <input
          type="time"
          name="startTime"
          value={newSlot.startTime}
          onChange={handleInputChange}
          disabled={!newSlot.date}
        />
        <input
          type="time"
          name="endTime"
          value={newSlot.endTime}
          onChange={handleInputChange}
          disabled={!newSlot.startTime}
        />
        <button onClick={handleAddSlot} disabled={!newSlot.endTime}>
          Add Slot
        </button>
      </div>

      {validationError && <div className="error">{validationError}</div>}

      <div className="time-slots">
        {timeSlots.map((slot) => (
          <div key={slot.id} className="time-slot">
            {moment(slot.startTime).format('h:mm a')} - {moment(slot.endTime).format('h:mm a')}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomTimeSlotSelect;

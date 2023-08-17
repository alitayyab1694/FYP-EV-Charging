import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import * as Actions from "Actions";
import  {TimeProgressBar} from "time-progress-bar";

import { useDispatch } from 'react-redux';
import { get24HourTimeArray } from 'utils';





const TimeSlot = ({ id, startTime, endTime,date }) => {
    const formattedStartTime = new Date(startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const formattedEndTime = new Date(endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <div className="time-slot">
            <div className="time-info">
          <p className="slot-id">Slot #{id}</p>
          <p className='date'>{date }</p>
                <p className="time-range">{formattedStartTime} - {formattedEndTime}</p>
            </div>
        </div>
    );
};
const CustomTimeSlotSelect = () => {
  const dispatch = useDispatch()
  const {  chargeBox } = useSelector((state) => ({
    
    chargeBox: state.appReducer.chargeBoxInfo,
    
  }));
  
  const [timeSlots, setTimeSlots] = useState([]);
  const [newSlot, setNewSlot] = useState({
    date: '',
    startTime: '',
    endTime: '',
  });
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    if (chargeBox) {
      setTimeSlots(chargeBox?.slots
 || [])    
    }
  }, [chargeBox?._id])
  
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
      return isSameDate && isSameStartTime && isSameEndTime 
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
      startTime: moment(`${date} ${startTime}`, 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm'),
      endTime: moment(`${date} ${endTime}`, 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm'),
      new : true
    };
    console.log("🚀 ~ file: index.js:86 ~ handleAddSlot ~ newTimeSlot:", newTimeSlot)

    setTimeSlots([...timeSlots, newTimeSlot]);
   dispatch(Actions.getChargeBoxesInfo({
                ...chargeBox , slots : [...timeSlots, newTimeSlot]
      })) 
    
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
        />
        <input
          type="time"
          name="startTime"
          value={newSlot.startTime}
          onChange={handleInputChange}
        />
        <input
          type="time"
          name="endTime"
          value={newSlot.endTime}
          onChange={handleInputChange}
        />
        <button onClick={handleAddSlot} disabled={!newSlot.endTime}>
          Add Slot
        </button>
      </div>

      {validationError && <div className="error">{validationError}</div>}

        <TimeProgressBar
    //     hourBar={
    //       get24HourTimeArray().map((val) => <span>{val}</span>)
    // }
        hourBar="tertiary"
    data={[ { start: "1:00:00", end: "8:06:00" },
      { start: "09:25:53", end: "13:06:00", },
      { start: "14:25:53", end: "19:06:00" },]}
      />
      
       <h1 className="app-title">Reserved Time Slots</h1>
            <div className="time-slot-container">
                {timeSlots.map(slot => (
                    <TimeSlot
                        key={slot.id}
                    id={slot.id}
                    date = {slot.date}
                        startTime={slot.startTime}
                        endTime={slot.endTime}
                    />
                ))}
            </div>
      
    </div>
  );
};

export default CustomTimeSlotSelect;

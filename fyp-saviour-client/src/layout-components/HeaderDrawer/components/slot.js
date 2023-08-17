import React, { useState } from 'react';
import * as Actions from "Actions";

import moment from 'moment';
import './style.css'
import { useDispatch  ,useSelector} from 'react-redux';
const CustomTimeSlotSelect = ({ slots }) => {
           const {  chargeBox } = useSelector((state) => ({
    
    chargeBox: state.appReducer.chargeBoxInfo,
    
  }));
const dispatch = useDispatch()
  const [selectedSlot, setSelectedSlot] = useState(null);

  const handleSlotSelect = (slot) => {
    if ((selectedSlot && selectedSlot.id === slot.id) || slot?.disabled) {
      setSelectedSlot(null); // Deselect the slot if it's already selected
    } else {
              setSelectedSlot(slot);
              dispatch(Actions.getChargeBoxesInfo({
                ...chargeBox , selectedSlot : slot
      }))     // Select the slot
    }
              
  };

  const isSlotDisabled = (slot) => {
    return slots.some((reservedSlot) => reservedSlot?.disabled);
  };

  return (
    <div className="custom-time-slot-select">
      <div className="time-slots">
        {slots.map((slot) => (
          <div
            key={slot.id}
            className={`time-slot ${isSlotDisabled(slot) ? 'disabled' : ''} ${
              selectedSlot && selectedSlot.id === slot.id ? 'selected' : ''
            }`}
            onClick={() => handleSlotSelect(slot)}
          >
            {moment(slot.startTime).format('h:mm a')} -{' '}
            {moment(slot.endTime).format('h:mm a')}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomTimeSlotSelect;
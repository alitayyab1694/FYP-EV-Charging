import TextField from '@material-ui/core/TextField';
import { LocalizationProvider, MobileTimePicker } from '@material-ui/pickers';
import DateMomentAdapter from '@material-ui/pickers/adapter/moment';
import moment from 'moment';
import React from 'react';
import DatePicker from 'react-datepicker';
import { Col, Row } from 'reactstrap';
import styled from 'styled-components';
const TimePickerStyled = styled.div`
  display: flex;
  flex-direction: column;
`;
const CalendarTime = ({
  form,
  setEndTimeError,
  setStartTimeError,
  onChangeHandler,
  className
}) => {
  const { startDate, startTime, endTime, profile } = form;

  return (
    <>
      <div className={`wizard-steps horizontal ${className}`}>
        <div className="p-4">
          <h5 className="font-size-xl font-weight-bold">Payment details</h5>
          <p className="text-black-50 mb-4">
            The next and previous buttons help you to navigate through your
            content.
          </p>
          <Row>
            <Col className="date-column" xl="4" lg="6" md="12" sm="12">
              <DatePicker
                selected={moment(startTime).toDate()}
                onChange={(date) => {
                  onChangeHandler(date, 'date');
                }}
                minDate={moment().toDate()}
                inline
              />
            </Col>

            <Col className="start-time-column" xl="4" lg="3" md="6" sm="12">
              <LocalizationProvider dateAdapter={DateMomentAdapter}>
                <TimePickerStyled>
                  <MobileTimePicker
                    renderInput={(props) => (
                      <TextField variant="outlined" {...props} />
                    )}
                    autoOk={false}
                    ampm={false}
                    label="Starting Time"
                    value={startTime}
                    ToolbarComponent={'hideTabs'}
                    onChange={(newValue) =>
                      onChangeHandler(newValue, 'startingTime')
                    }
                    onAccept={() => {
                      setStartTimeError(false);
                    }}
                    onError={(e) => {
                      onChangeHandler(moment(), 'startingTime');
                      onChangeHandler(
                        moment(startTime).add(1, 'hours'),
                        'endingTime'
                      );
                      setStartTimeError(true);
                    }}
                    shouldDisableTime={(timeValue, clockType) => {
                      if (
                        moment(moment(startTime).format('YYYY-MM-DD')).isSame(
                          moment().format('YYYY-MM-DD')
                        )
                      ) {
                        if (
                          moment(startDate).format('YYYY-MM-DD') !==
                          moment().format('YYYY-MM-DD')
                        ) {
                          return false;
                        }
                        if (
                          clockType === 'hours' &&
                          timeValue < moment().format('HH')
                        ) {
                          return true;
                        }
                        if (
                          clockType === 'minutes' &&
                          moment(startTime).format('HH') ===
                            moment().format('HH') &&
                          timeValue < moment().format('mm')
                        ) {
                          return true;
                        }
                      }

                      return false;
                    }}
                  />
                </TimePickerStyled>
              </LocalizationProvider>
            </Col>
            {profile?.value !== 'profilePKW' && (
              <Col className="end-time-column" xl="4" lg="3" md="6" sm="12">
                <LocalizationProvider dateAdapter={DateMomentAdapter}>
                  <TimePickerStyled>
                    <MobileTimePicker
                      renderInput={(props) => (
                        <TextField variant="outlined" {...props} />
                      )}
                      ampm={false}
                      autoOk={false}
                      label="Ending Time"
                      onAccept={() => {
                        setEndTimeError(false);
                      }}
                      ToolbarComponent={'hideTabs'}
                      onError={(e) => {
                        onChangeHandler(
                          moment(startTime).add(1, 'hours'),
                          'endingTime'
                        );
                        setEndTimeError(true);
                      }}
                      shouldDisableTime={(timeValue, clockType) => {
                        if (
                          moment(moment(startTime).format('YYYY-MM-DD')).isSame(
                            moment(endTime).format('YYYY-MM-DD')
                          )
                        ) {
                          if (
                            clockType === 'hours' &&
                            timeValue <= moment(startTime).format('HH')
                          ) {
                            return true;
                          }
                          if (
                            Number(moment(endTime).format('HH')) ===
                            Number(moment(startTime).format('HH')) + 1
                          ) {
                            if (
                              clockType === 'minutes' &&
                              timeValue < Number(moment(startTime).format('mm'))
                            ) {
                              return true;
                            }
                          }
                        }
                        let hourEnd =
                          moment(endTime).format('HH') === '00'
                            ? '24'
                            : moment(endTime).format('HH');
                        if (
                          Number(hourEnd) ===
                          Number(moment(startTime).format('HH')) + 1
                        ) {
                          if (
                            clockType === 'minutes' &&
                            timeValue < Number(moment(startTime).format('mm'))
                          ) {
                            return true;
                          }
                        }
                      }}
                      value={endTime}
                      onChange={(newValue) => {
                        onChangeHandler(newValue, 'endingTime');
                      }}
                    />
                  </TimePickerStyled>
                </LocalizationProvider>
              </Col>
            )}
          </Row>
        </div>
      </div>
    </>
  );
};

export default styled(CalendarTime)`
  @media screen and (max-width: 480px) {
    .date-column {
      padding: inherit;
    }
    .start-time-column {
      margin-top: 40px;
      margin-bottom: 5px;
    }
  }
  @media screen and (max-width: 1096px) {
    .start-time-column {
      margin-top: 40px;
    }
    .end-time-column {
      margin-top: 40px;
    }
    .date-column {
      text-align: center;
    }
  }
`;

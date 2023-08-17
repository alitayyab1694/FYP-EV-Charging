import * as API from 'api';
import SearchSelect from 'custom-components/SearchSelect';
import React, { useEffect, useState } from 'react';
import LaddaButton, { XL } from 'react-ladda';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import { CircleLoader } from 'react-spinners';
import { toast, Zoom } from 'react-toastify';
import { Button, Card, CardBody, Col, Row, FormFeedback } from 'reactstrap';
import styled from 'styled-components';
import Chart from './components/Charts';
import ReportTable from './components/ReportTable';
import './style.css';
import { Formik, Form } from 'formik';
import { reportsValidation } from 'validation';

const LivePreviewExample = () => {
  const [selected, setSelected] = useState(1);
  const [totalCo2, setTotalCo2] = useState(0);
  const [report, setReportDate] = useState([]);
  const [totalDistanceCovered, setTotalDistanceCovered] = useState(0);
  const [totalConsumption, setTotalConsumption] = useState(0);
  const [chartDate, setChartData] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [rows, setRows] = useState([]);

  const { mainLoading } = useSelector((state) => ({
    chargeBox: state.appReducer.chargeBox,
    mainLoading: state.appReducer.isLoading
  }));
  const [isLoading, setIsLoading] = useState(false);
  // const [form, setform] = useState({
  //   chargeboxid: null,
  //   type: null
  // });

  useEffect(() => {
    if (selected === 1) {
      setChartData(
        report.map((item) => ({
          month: item.time_period,
          value: parseFloat(item.total_co2_reduction)
        }))
      );
    } else if (selected === 2) {
      setChartData(
        report.map((item) => ({
          month: item.time_period,
          value: item.total_distance
        }))
      );
    } else if (selected === 3) {
      setChartData(
        report.map((item) => ({
          month: item.time_period,
          value: item.total_consumption
        }))
      );
    }
    setRows(report.map((item, ind) => item));
  }, [toggle]);

  const onSubmitHandler = async (values, resetForm) => {
    // e.preventDefault();
    console.log('va', values);
    try {
      setIsLoading(true);
      const res = await API.get(
        `/chargebox-genreport-repo?chargebox_id=${values?.chargeboxid?.value}&duration=${values.type.value}`
      );
      setReportDate(
        [...Array(values?.type.value === 'weekly' ? 52 : 12).keys()].map(
          (i) => {
            let temp = res.find((val) => val.time_period === i + 1);
            if (!temp) {
              return {
                time_period: i + 1,
                total_co2_reduction: 0,
                total_consumption: 0,
                total_distance: 0
              };
            }
            return temp;
          }
        )
      );
      console.log('res', res);
      setTotalCo2(
        res
          ?.reduce(
            (acc, item, ind) => acc + parseFloat(item.total_co2_reduction),
            0
          )
          .toFixed(2)
      );
      setTotalDistanceCovered(
        res
          ?.reduce((acc, item, ind) => acc + parseFloat(item.total_distance), 0)
          .toFixed(2)
      );
      setTotalConsumption(
        res
          ?.reduce(
            (acc, item, ind) => acc + parseFloat(item.total_consumption),
            0
          )
          .toFixed(2)
      );
      setSelected(1);
      setToggle(!toggle);
      toast.success('Report Generated', {
        containerId: 'D',
        transition: Zoom
      });
      setIsLoading(false);
    } catch (error) {
      toast.error(error?.response?.data?.error, {
        containerId: 'D',
        transition: Zoom
      });
      setIsLoading(false);
    }
  };
  if (mainLoading) {
    return (
      <div className="d-flex align-items-center flex-column vh-100 justify-content-center text-center py-3">
        <div className="d-flex align-items-center flex-column px-4">
          <CircleLoader color={'#2f2f2f'} loading={true} />
        </div>
        <div className="text-muted font-size-xl text-center pt-3">
          Please wait while we load.....
        </div>
      </div>
    );
  }

  const tabHandler = (val) => {
    setSelected(val);
    setToggle(!toggle);
  };

  return (
    <>
      <Card>
        <CardBody>
          <Formik
            initialValues={{ chargeboxid: null, type: null }}
            onSubmit={(values, { resetForm }) => {
              onSubmitHandler(values, resetForm);
            }}
            validationSchema={reportsValidation}
            render={({
              values,
              errors,
              touched,
              handleSubmit,
              setFieldError,
              setFieldValue,
              setFieldTouched,
              handleBlur,
              handleChange
            }) => (
              <Form onSubmit={handleSubmit}>
                {console.log('values', values)}
                {console.log('errors', errors)}
                <Row>
                  <Col xs={6} md={5}>
                    <SearchSelect
                      classes="my-3"
                      url="chargeboxes"
                      searchUrl="chargeboxes"
                      form={values.chargeboxid}
                      error={errors.chargeboxid}
                      touch={touched.chargeboxid}
                      setform={setFieldValue}
                      onError={setFieldError}
                      onBlur={setFieldTouched}
                      placeholder="-- Search Chargebox --"
                      name="chargeboxid"
                      component="chargebox"
                    />
                  </Col>
                  <Col xs={6} md={5}>
                    <Select
                      className="my-3"
                      placeholder="-- Select Duration --"
                      value={values.type}
                      name="type"
                      onBlur={(value) => {
                        setFieldTouched('type', true);
                        setFieldError('type', value.error);
                      }}
                      // onChange={(e) => setform({ ...form, type: e.value })}
                      onChange={(e) => setFieldValue('type', e)}
                      options={[
                        { value: 'monthly', label: 'Monthly' },
                        { value: 'weekly', label: 'Weekly' }
                      ]}
                      theme={(theme) => ({
                        ...theme,
                        borderRadius: '0.29rem',
                        borderWidth: 1,

                        colors: {
                          ...theme.colors,
                          primary25: 'rgba(60,68,177,0.15)',
                          primary50: 'rgba(60,68,177,0.15)',
                          primary: '#3c44b1'
                        }
                      })}
                    />
                    {!!errors.type && touched.type && (
                      <FormFeedback className="d-block">
                        {errors.type}
                      </FormFeedback>
                    )}
                  </Col>
                  <Col className="text-right" sx={12} md={2}>
                    <LaddaButton
                      loading={isLoading}
                      disabled={!values.chargeboxid?.value || !values.type}
                      data-size={XL}
                      // onClick={onSubmitHandler}
                      type="submit"
                      className="mb-5 btn btn-primary font-weight-bold w-20 my-3">
                      Generate
                    </LaddaButton>
                  </Col>
                  <Col xs={4} className="pr-0 my-3 ">
                    <Button
                      color={selected === 1 ? 'primary' : 'secondary'}
                      style={{ width: '100%', height: 100, border: 'none' }}
                      onClick={() => tabHandler(1)}>
                      Co2 Reduction&nbsp;({totalCo2}kg)
                    </Button>
                  </Col>
                  <Col xs={4} className="px-0 my-3">
                    <Button
                      color={selected === 2 ? 'primary' : 'secondary'}
                      style={{ width: '100%', height: 100, border: 'none' }}
                      onClick={() => tabHandler(2)}>
                      Distance Covered&nbsp;({totalDistanceCovered}km)
                    </Button>
                  </Col>
                  <Col xs={4} className="pl-0 my-3">
                    <Button
                      color={selected === 3 ? 'primary' : 'secondary'}
                      style={{ width: '100%', height: 100, border: 'none' }}
                      onClick={() => tabHandler(3)}>
                      Consumption ({totalConsumption}kW)
                    </Button>
                  </Col>
                  <Col xs={12}>
                    <Chart
                      chartData={chartDate}
                      chargeboxName={values?.chargeboxid?.value}
                      durationType={values?.type?.value}
                    />
                  </Col>
                  <Col xs={12} className="my-3">
                    <ReportTable duration={values?.type?.value} row={rows} />
                  </Col>
                </Row>
              </Form>
            )}
          />
        </CardBody>
      </Card>
    </>
  );
};
export default styled(LivePreviewExample)`
  section_header {
    position: relative;
    width: 100%;
    padding-right: 20px;
    padding-left: 20px;
  }
`;

/** @format */

import history from "@history";
import * as API from "api";
import { useFormik, FormikProvider } from "formik";
import React, { useEffect, useState } from "react";
import LaddaButton, { XL } from "react-ladda";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CircleLoader } from "react-spinners";
import moment from "moment";
import { Col, Row } from "reactstrap";
import { getChargeBox } from "store/reducer/appReducerSlice";
import styled from "styled-components";
import { Toaster } from "utils";
import { chargeboxValidation } from "validation";
import Address from "./Components/Address";
import Misc from "./Components/Misc";
import OCCP from "./Components/OCCP";
import "./style.css";
import CustomTimeSlotSelect from '../../../components/TimeSlot'
const initialValues = {
  ocpp: {
    chargeboxId: null,
    registrationStatus: { value: "Active", label: "Active" },
    endpointAddress: null,
  },
  address: {
    street: null,
    houseNo: null,
    zipcode: null,
    country: { value: null, label: null },
    state: { value: null, label: null },
    city: { value: null, label: null },
  },
  misc: {
    desc: null,
    adminAddress: null,
    latitude: null,
    longitude: null,
    notes: null,
  },
  slots : []
};

const Chargebox = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { chargeBoxId } = params;
  const { user, mainLoading } = useSelector((state) => ({
    user: state.user,
    mainLoading: state.appReducer.isLoading,
  }));
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    // validationSchema: chargeboxValidation,
    initialValues,
    onSubmit: (values) => {
      ;
      onSubmitHandler(values, resetForm);
    },
  });
  const newChargebox = chargeBoxId === "new";
  const { setValues, handleSubmit, resetForm, errors, values } = formik;
  useEffect(() => {
    
    !newChargebox && dispatch(getChargeBox(chargeBoxId));
  }, [chargeBoxId]);
  useEffect(() => {
    const fetchChargebox = async () => {
      try {
        const { get, GET_CHARGEBOX } = API;
        const res = await get(GET_CHARGEBOX + chargeBoxId);
        console.log("res in fetch", res);
        setValues(res);
      } catch (error) {
        console.log("error", error);
      }
    };
    !newChargebox && fetchChargebox();
  }, [chargeBoxId]);

  const onSubmitHandler = async (values, resetForm) => {
    try {
      setIsLoading(true);
      const { post, patch, ADD_CHARGEBOX, UPDATE_CHARGEBOX } = API;
      if (newChargebox) {
        await post(ADD_CHARGEBOX, {
          ...values, company: user?.company, misc: {
            ...values.misc,
            chargingType : values.misc.chargingType.value
          }
        });
      } else {
        await patch(UPDATE_CHARGEBOX + chargeBoxId, values);
      }
      Toaster(
        "success",
        `ChargeBox ${!newChargebox ? "Updated" : "Created"} successfully`
      );
      // history.push("/chargeboxes");
    } catch (error) {
      console.log("error", error);
      setIsLoading(false);
      Toaster("error", error?.response?.data?.message);
    }
  };
 
  if (mainLoading) {
    return (
      <div className='d-flex align-items-center flex-column vh-100 justify-content-center text-center py-3'>
        <div className='d-flex align-items-center flex-column px-4'>
          <CircleLoader color={"#2f2f2f"} loading={true} />
        </div>
        <div className='text-muted font-size-xl text-center pt-3'>
          Please wait while we load.....
        </div>
      </div>
    );
  }

  return (
    <FormikProvider value={formik}>
      <div className='section_header mb-3'>
        <div className='font-weight-bold text-black font-size-xxl'>OCPP</div>
      </div>

      <OCCP newChargebox={newChargebox} id='occp' />

      <div className='section_header mb-3'>
        <div className='font-weight-bold text-black font-size-xxl'>Address</div>
      </div>
      <Address />

      <div className='section_header mb-3'>
        <div className='font-weight-bold text-black font-size-xxl'>Misc</div>
      </div>
      <Misc />
      {/* <CustomTimeSlotSelect/> */}
      <Row className='mt-3'>
        <Col className='text-right' md={12}>
          <LaddaButton
            loading={isLoading}
            data-size={XL}
            type='submit'
            onClick={handleSubmit}
            className='mb-5 btn btn-primary font-weight-bold w-20 my-2'>
            Submit
          </LaddaButton>
        </Col>
      </Row>
    </FormikProvider>
  );
};
export default styled(Chargebox)`
  section_header {
    position: relative;
    width: 100%;
    padding-right: 20px;
    padding-left: 20px;
  }
`;

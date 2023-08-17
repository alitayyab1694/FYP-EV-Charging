import * as Actions from "Actions";
import { get } from "api";
import Pin from "assets/images/map-pins/evappin.svg";
import { GoogleApiWrapper, Map, Marker } from "google-maps-react";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  setSidebarToggle,
  setSidebarToggleMobile,
} from "reducers/ThemeOptions";

const MapContainer = (props) => {
  const [chargebox, setchargebox] = useState([]);
  const [geoCode, setGeoCode] = useState({ lat: 24.8607, lng: 67.0011 });
  useEffect(() => {
   
     if ('geolocation' in navigator) {
      // Get the current position
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setGeoCode({
             lat:position.coords.latitude, lng: position.coords.longitude
          })
        },
        (error) => {
          console.error('Error getting geolocation:', error);
        }
      );
    } else {
      console.error('Geolocation is not available in this browser.');
    }
  }, [props.stepper]);
  useEffect(() => {
    get("/chargeboxes")
      .then((result) => {
        setchargebox(result);
      })
      .catch(console.error);
  }, []);
  const toggleSidebarMobile = () => {
    props.setSidebarToggleMobile(!props.sidebarToggleMobile);
  };
  const toggleSidebar = () => {
    props.setSidebarToggle(!props.sidebarToggle);
  };
  const onMarkerClick = (s) => {
    if (!props.user) {
      props.setloginModel(true);
      return;
    }
    props.setChargeBoxesInfo(s);
    // history.push(`/chargebox/${s?.chargeboxid}`);
    props.getChargeBox(s.chargeboxid, props.user);
    toggleSidebarMobile();
  };

  const containerStyle = {
    position: "relative",
    width: "100%",
    height: "100%",
  };

  const jsonData = [
    {
      chargeboxid: "1",
      latitude: "24.8607",
      longitude: "67.0011",
      city: "Karachi",
    },
    {
      chargeboxid: "2",
      latitude: "31.5497",
      longitude: "74.3436",
      city: "Lahore",
    },
    {
      chargeboxid: "3",
      latitude: "33.6844",
      longitude: "73.0479",
      city: "Islamabad",
    },
    // Add more city data objects as needed
  ];
  return (
    <>
      <Map
      className="w-100"
      style={{ height: "calc(100vh - 74px)" }}
      containerStyle={containerStyle}
      google={props.google}
      center={geoCode}
      zoom={14}
    >
      {chargebox.map((s, i) => (
        <Marker
          key={i}
          onClick={() => onMarkerClick(s)}
          title={s.name}
          name={s.name}
          position={{
            lat: parseFloat(s.misc.latitude),
            lng: parseFloat(s.misc.longitude),
          }}
          icon={Pin}
        />
      ))}
    </Map>
    </>
      
  );
};
const mapStateToProps = (state) => ({
  user: state.user,
  stepper: state.model.stepper,
  chargeboxes: state.appReducer.chargeBox,
  sidebarToggle: state.ThemeOptions.sidebarToggle,
  sidebarToggleMobile: state.ThemeOptions.sidebarToggleMobile,
  isStepper: state.appReducer.stepper,
});
const mapDispatchToProps = (dispatch) => ({
  setSidebarToggle: (enable) => dispatch(setSidebarToggle(enable)),
  setSidebarToggleMobile: (enable) => dispatch(setSidebarToggleMobile(enable)),
  setChargeBoxesInfo: (data) => dispatch(Actions.getChargeBoxesInfo(data)),
  getChargeBox: (data, user) => dispatch(Actions.getChargeBox(data, user)),
  setStepper: (data) => dispatch(Actions.stepper(data)),
  setloginModel: (data) => dispatch(Actions.loginModel(data)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  GoogleApiWrapper({
    apiKey: "AIzaSyB-QSr8fnsq_tujGc0BY5WBrwUEtcnyjJg",
  })(MapContainer)
);

/** @format */

import * as Actions from "Actions";
import { get } from "api";
import Table from "custom-components/Table";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getReservation,
  SearchReservation,
} from "store/reducer/appReducerSlice";
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
export default function LivePreviewExample() {
  const dispatch = useDispatch();
  const { user} = useSelector((state) => ({
    user: state.user,
  }));
  const [reservation, setReservation] = useState([])
  const [header, setHeader] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
      const query= user?.company ? `?companyId=${user?.company}` : ''
    get('/reservation'+query).then((res) => {
      setReservation(res)
      
    }).catch(console.error)
   
  }, []);
  useEffect(() => {
    setHeader([
      { name: "Reservation Start Date/Time", date : true , fieldName: "startTime" },
      { name: "Reservation End Date/Time", date : true , fieldName: "EndTime" },
      { name: "Charge Box", fieldName: "chargeboxid" },
      { name: "User Email", special: "userId/email" },
      { name: "User Name", special: "userId/name" },
     
    ]);
  }, []);

  useEffect(() => {
    setisLoading(true);

    const fetchData = async () => {
      try {
        await dispatch(await SearchReservation(searchTerm));
        setisLoading(false);
      } catch (error) {
        console.log("Error", error);
        setisLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchData();
    }, 3000);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const searchHandler = (e) => {
    setSearchTerm(e.target.value);
  };
 const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    width: 100,
    fontWeight: 'bold',
  },
  value: {
    flex: 1,
  },
});

 const ReservationToPdf = ({ reservations }) => {

  // Define the PDF component
  const MyPdf = () => (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.title}>Reservation Details</Text>
        {reservations.map((reservation) => (
          <View key={reservation._id} style={styles.container}>
            <View style={styles.row}>
              <Text style={styles.label}>Reservation ID:</Text>
              <Text style={styles.value}>{reservation._id}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Chargebox ID:</Text>
              <Text style={styles.value}>{reservation.chargeboxId}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Reservation Date:</Text>
              <Text style={styles.value}>{reservation.reservationDate}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>User ID:</Text>
              <Text style={styles.value}>{reservation?.userId?._id}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>User Email:</Text>
              <Text style={styles.value}>{reservation?.userId?.email}</Text>
            </View>
            {/* Add more fields as needed */}
          </View>
        ))}
      </Page>
    </Document>
  );

  return (
    <div>
      <PDFDownloadLink document={<MyPdf />} fileName="reservations.pdf">
        {({ blob, url, loading, error }) =>
          loading ? 'Loading...' : 'Download PDF'
        }
      </PDFDownloadLink>
    </div>
  );
};

  return (
    <>
      <div className='table-responsive-md'>
        <ReservationToPdf reservations={!!reservation.length ?  reservation : []} />
        <Table
          Title='Reservations'
          isLoading={isLoading}
          setisLoading={setisLoading}
          headers={header}
          row={!!reservation.length ?  reservation : []}
          total={reservation?.count}
          next={reservation?.next}
          previous={reservation?.previous}
          paginateFunction={getReservation}
          searchHandler={searchHandler}
        />
      </div>
    </>
  );
}

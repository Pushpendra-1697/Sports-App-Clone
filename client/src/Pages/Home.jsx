import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';
import { getEvents } from '../redux/Event/event.action';
import { Alert, AlertIcon, Box, Button, Input, } from '@chakra-ui/react';
import { BiLoaderCircle } from "react-icons/bi";
import EventLists from '../Components/EventLists';


var totalPages = 5;
const Home = () => {
  const { loading, error, events } = useSelector((store) => store.eventManager);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [eventName, setEventName] = useState('');
  const [q, setQ] = useState('');



  useEffect(() => {
    dispatch(getEvents(page, eventName, q));
  }, [page, eventName, q]);


  const handlePage = (val) => {
    let value = val + page;
    setPage(value);
  };

  if (localStorage.getItem('token') === null) {
    return <Navigate to="/login" />
  }
  return (
    <Box>

      {loading && (
        <Box display={"flex"} justifyContent="center" alignItems={"center"}>
          {" "}
          <BiLoaderCircle fontSize={"34px"} />{" "}
        </Box>
      )}
      {error && <Box display={"flex"} justifyContent="center" alignItems={"center"}>
        <Alert status='error' w="300px" >
          <AlertIcon />
          {`Something went Wrong 😒`}
        </Alert>
      </Box>}




      {/* Filter By Event Name */}
      <Box display={"flex"} justifyContent={"space-evenly"} m={{ base: "10% 0", sm: "10% 0", md: "3% 0", xl: "3% 0", "2xl": "3% 0" }}>
        <Input color={'green'} w={["160px", "160px", "240px"]} placeholder={"Enter Event Name..."} value={q} onChange={(e) => setQ(e.target.value)} />
        <select value={eventName} onChange={(e) => setEventName(e.target.value)} style={{ border: "1px solid black" }}>
          <option value={''}>Filter By Event Name</option>
          <option value={"Football"}>Football</option>
          <option value={"Cricket"}>Cricket</option>
          <option value={"Badminton"}>Badminton</option>
        </select>
      </Box>

      {/* EventLists */}
      <EventLists events={events} />

      {/* Pagination */}
      <Box display={"flex"} alignItems="center" justifyContent={"center"} m="3% 0" gap={"5px"}>
        <Button variant={"outline"} color="green" isDisabled={page <= 1} onClick={() => handlePage(-1)}>◀️PRE</Button>
        <Button variant={"outline"} color="red" isDisabled={true}>{page}</Button>
        <Button variant={"outline"} color="green" isDisabled={page >= totalPages} onClick={() => handlePage(1)}>NEXT▶️</Button>
      </Box>

    </Box>
  )
}

export default Home
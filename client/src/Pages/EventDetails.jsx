import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { backend_url } from './BackendURL';
import { useSelector } from 'react-redux';
import { BiLoaderCircle } from "react-icons/bi";
import { Alert, AlertIcon, Box, Button, Container, Text, useToast } from '@chakra-ui/react';


function getEventById(id) {
  return fetch(`${backend_url}/events/get/${id}`).then((res) => res.json());
};

const EventDetails = () => {
  const { loading, error } = useSelector((store) => store.eventManager);
  const [data, setData] = useState(null);
  const params = useParams();
  const [adminName, setAdminName] = useState('');
  const toast = useToast();


  useEffect(() => {
    getEventById(params.event_id).then((res) => setData(res.event)).catch((err) => console.log(err));
  }, []);


  const handleAccept = async (event_id) => {
    try {
      let res = await fetch(`${backend_url}/accept`, {
        method: "POST",
        headers: {
          token: localStorage.getItem('token'),
          event_id
        }
      });
      res = await res.json();
      if (res.msg == "Send Request") {
        toast({
          title: `${res.msg}`,
          status: "success",
          isClosable: true,
        });
        setAdminName(res.adminName);
      } else {
        toast({
          title: `${res.msg}`,
          status: "warning",
          isClosable: true,
        });
        setAdminName(res.adminName);
      }
    } catch (err) {
      console.log(err);
    }
  };


  if (data == null) {
    return (<h1 style={{ textAlign: "center", fontSize: "23px" }}>Loading....</h1>)
  };
  return (
    <>
      <Container w="95%" boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px" padding={"10px"} borderRadius={"10px"} mt={["15%", "15%", "5%"]}>
        {(loading || data == null) && (
          <Box display={"flex"} justifyContent="center" alignItems={"center"}>
            {" "}
            <BiLoaderCircle fontSize={"34px"} />{" "}
          </Box>
        )}
        {error && <Box display={"flex"} justifyContent="center" alignItems={"center"}>
          <Alert status='error' w="300px" >
            <AlertIcon />
            {`Something went Wrong`}
          </Alert>
        </Box>}

        <Box display={"flex"} justifyContent={"space-between"}>
          <Text>Event Name: {data.name}</Text>
          {adminName && <Text color={"green"}>Organizer: {adminName}</Text>}
        </Box>
        <Text w="300px">Description: {data.desc}</Text>
        <Text>Start Date: {data.start}</Text>
        <Text>End Date: {data.end}</Text>
        <Text>Player Limit: {data.maxPlayer}</Text>
        <Text mb="13px">CreatedAt: {data.createdAt}</Text>
        <Box display={"flex"} justifyContent={"space-evenly"}>
          <Link style={{ textDecoration: "none", color: "red", background: "black", padding: "8px", borderRadius: "10px" }} to='/'>Go Back</Link>
          <Button bg="black" color={"goldenrod"} variant={"outline"} isDisabled={data.maxPlayer <= data.users.length} onClick={() => handleAccept(data._id)}>Join Event</Button>
        </Box>
      </Container>

    </>
  )
}

export default EventDetails;
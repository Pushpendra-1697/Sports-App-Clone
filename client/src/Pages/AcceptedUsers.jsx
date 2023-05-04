import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { backend_url } from './BackendURL';
import { useSelector } from 'react-redux';
import { Alert, AlertIcon, Box, Container, Heading, Text } from '@chakra-ui/react';
import { BiLoaderCircle } from "react-icons/bi";

function getAcceptedUsersById(id, index) {
  return fetch(`${backend_url}/overview/accepted/${id}/${index}`).then((res) => res.json());
};
const AcceptedUsers = () => {
  const params = useParams();
  const [data, setData] = useState(null);
  const { loading, error } = useSelector((store) => store.eventManager);

  useEffect(() => {
    getAcceptedUsersById(params.event_id, params.index).then((res) => setData(res)).catch((err) => console.log(err));
  }, []);


  if (data == null) {
    return (<h1 style={{ textAlign: "center", fontSize: "23px" }}>Loading....</h1>);
  };

  const { users, payload } = data;
  const { name, start, end, maxPlayer, adminName, desc } = payload;

  return (
    <>
      {(loading || data == null) && (
        <Box display={"flex"} justifyContent="center" alignItems={"center"}>
          {" "}
          <BiLoaderCircle fontSize={"34px"} />{" "}
        </Box>
      )}
      {error && <Box display={"flex"} justifyContent="center" alignItems={"center"}>
        <Alert status='error' w="300px" >
          <AlertIcon />
          {`Something went Wrong😒`}
        </Alert>
      </Box>}

      <Container w="95%" boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px" padding={"10px"} borderRadius={"10px"} mt={["15%", "15%", "5%"]}>
        <Box>
          <Text>Description: {desc}</Text>
          <Text>Oranizer: {adminName}</Text>
          <Text>StartAt: {start}</Text>
          <Text>EndAt: {end}</Text>
          <Text>Player Limit: {maxPlayer}</Text>
        </Box>
        <Heading mt="5%" fontSize={"19px"}>All Joined/Accepted Player for {name}: {`[${users.length}]`}</Heading>
        <Box mb="5%">
          {users && users.map(({ _id, userName }) =>
            <Text key={_id}>{userName}</Text>
          )}
        </Box>
        <Link style={{ textDecoration: "none", color: "red", background: "black", padding: "8px", borderRadius: "10px" }} to='/overview'>Go Back</Link>
      </Container>
    </>
  );
}

export default AcceptedUsers;
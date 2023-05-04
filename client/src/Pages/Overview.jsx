import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { backend_url } from './BackendURL';
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr, Text, Button, Box, Alert, AlertIcon, useToast } from '@chakra-ui/react';
import { BiLoaderCircle } from "react-icons/bi";
import { BsToggle2Off } from 'react-icons/bs';
import { FcAcceptDatabase } from 'react-icons/fc';
import { RxCross1, RxCrossCircled } from 'react-icons/rx';

const Overview = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();
    const toast = useToast();

    useEffect(() => {
        getRequests();
    }, []);

    const getRequests = async () => {
        try {
            setIsLoading(true);
            let res = await fetch(`${backend_url}/getAllRequests`, {
                method: "GET",
                headers: {
                    "Content-Type": 'application/json',
                    token: localStorage.getItem('token')
                }
            });
            res = await res.json();
            setData(res);
            setIsLoading(false);
            setIsError(false);
        } catch (err) {
            setIsError(true);
            setIsLoading(false);
        }
    };

    const handleUpdateStatus = async (id, change, eventId) => {
        let payload = { status: change };
        try {
            let res = await fetch(`${backend_url}/changeStatus/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": 'application/json',
                    "token": localStorage.getItem('token'),
                    "event_id": eventId
                },
                body: JSON.stringify(payload)
            });
            res = await res.json();
            toast({
                title: `${res.msg}`,
                status: "info",
                isClosable: true,
            });
            if (res.msg == "Sorry😒 Game Start Already! You Can't Accept Now") {
                return;
            };
            getRequests();
        } catch (err) {
            setIsError(true);
            setIsLoading(false);
        }
    };


    const handleRejectRequest = async (id, change, eventId) => {
        let payload = { reject: change };
        try {
            setIsLoading(true);
            let res = await fetch(`${backend_url}/rejectRequest/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": 'application/json',
                    "token": localStorage.getItem('token'),
                    "event_id": eventId
                },
                body: JSON.stringify(payload)
            });
            res = await res.json();
            toast({
                title: `${res.msg}`,
                status: "info",
                isClosable: true,
            });
            getRequests();
        } catch (err) {
            setIsError(true);
            setIsLoading(false);
        }
    };

    const handleAccepted = (id, index) => {
        navigate(`/overview/accept/${id}/${index}`);
    };
    const handleRejected = (id, index) => {
        navigate(`/overview/reject/${id}/${index}`);
    };


    if (localStorage.getItem('token') === null) {
        return <Navigate to="/login" />
    };
    return (
        <>
            {isLoading && (
                <Box display={"flex"} justifyContent="center" alignItems={"center"}>
                    {" "}
                    <BiLoaderCircle fontSize={"34px"} />{" "}
                </Box>
            )}
            {isError && <Box display={"flex"} justifyContent="center" alignItems={"center"}>
                <Alert status='error' w="300px" >
                    <AlertIcon />
                    {`Something went Wrong 😒`}
                </Alert>
            </Box>}
            <TableContainer mt={["15%", "15%", "0%"]}>
                <Table size='sm' variant={"striped"}>
                    <Thead>
                        <Tr>
                            <Th>Event Name</Th>
                            <Th>Player Limit</Th>
                            <Th>Start Time</Th>
                            <Th>User Name</Th>
                            <Th>Status</Th>
                            <Th>Change Status</Th>
                            <Th>Reject Request</Th>
                            <Th>Accepted Users</Th>
                            <Th>Rejected Users</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data && data.map((ele, index) =>
                            <Tr key={ele._id}>
                                <Td>{ele.name}</Td>
                                <Td>{ele.maxPlayer}</Td>
                                <Td>{ele.start}</Td>
                                <Td>{ele.users && ele.users.map(({ userName, _id }) =>
                                    <Text mb='10%' key={_id}>{userName}</Text>
                                )}</Td>
                                <Td>{ele.users && ele.users.map(({ status, reject, _id }) =>
                                    <Text mb='20%' key={_id}>{status || reject ? <Text color={"green"}>{reject ? <Text color={'red'}>Rejected</Text> : <Text color={'green'}>Accepted</Text>}</Text> : <Text color={"goldenrod"}>Pending</Text>}</Text>
                                )}</Td>
                                <Td>{ele.users && ele.users.map(({ _id, status }) =>
                                    <Text key={_id}><Button isDisabled={localStorage.getItem('user_id') !== ele.admin_id} onClick={() => handleUpdateStatus(_id, !status, ele._id)}><BsToggle2Off color='green' /></Button></Text>
                                )}</Td>
                                <Td>{ele.users && ele.users.map(({ _id, reject }) =>
                                    <Text key={_id}><Button isDisabled={localStorage.getItem('user_id') !== ele.admin_id} mb='1%' onClick={() => handleRejectRequest(_id, !reject, ele._id)}><RxCrossCircled color='red' /></Button></Text>
                                )}</Td>


                                <Td>{ele.users && ele.users.map(({ _id, status }) =>
                                    <Text key={_id}><Button onClick={() => handleAccepted(ele._id, index)} isDisabled={status === false} mb='1%'><FcAcceptDatabase fontSize={"20px"} color='green' /></Button></Text>
                                )}</Td>

                                <Td>{ele.users && ele.users.map(({ _id, status }) =>
                                    <Text key={_id}><Button onClick={() => handleRejected(ele._id, index)} mb='1%'><RxCross1 fontSize={"20px"} color='red' /></Button></Text>
                                )}</Td>
                            </Tr>
                        )}
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    );
}

export default Overview;
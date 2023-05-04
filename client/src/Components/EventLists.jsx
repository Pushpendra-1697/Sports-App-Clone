import { Box, Heading, Text } from '@chakra-ui/react'
import React from 'react';
import { Link } from 'react-router-dom';

const EventLists = ({ events }) => {

    return (
        <>
            <Box textAlign={"center"} display={"grid"} gridTemplateColumns={["repeat(2,1fr)", "repeat(2,1fr)", "repeat(3,1fr)"]} gap={"20px"} w="90%" m="auto">
                {events && events.map(({ _id, start, end, maxPlayer, name, users }) =>
                    <Box key={_id} boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px" padding={"20px 10px"} borderRadius={"10px"}>
                        <Heading fontSize={'22px'}>{name}</Heading>
                        <Text>Start Date: {start}</Text>
                        <Text>End Date: {end}</Text>
                        <Text>Player Limit: {maxPlayer}</Text>
                        <Box display='flex' justifyContent={'space-evenly'} m='1% 0'>
                            <Text>Joined Player: {users.length}</Text>
                            <Text color={'green'}>Available Slots: {maxPlayer - users.length}</Text>
                        </Box>
                        <Link to={`/${_id}`}><Text color={'red'}>More Details</Text></Link>
                    </Box>
                )}
            </Box>
        </>
    );
}

export default EventLists;
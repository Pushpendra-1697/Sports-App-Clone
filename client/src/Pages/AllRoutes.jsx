import { Box } from '@chakra-ui/react';
import React from 'react';
import { Route, Routes } from 'react-router-dom'
import Home from './Home';
import EventDetails from './EventDetails';
import Signup from './Signup';
import Login from './Login';
import Admin from './Admin';
import Overview from './Overview';
import AcceptedUsers from './AcceptedUsers';
import RejectedUsers from './RejectedUsers';


const AllRoutes = () => {
    return (
        <Box>
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/:event_id' element={<EventDetails />}></Route>
                <Route path='/register' element={<Signup />}></Route>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/admin' element={<Admin />}></Route>
                <Route path='/overview' element={<Overview />}></Route>
                <Route path='/overview/accept/:event_id/:index' element={<AcceptedUsers />}></Route>
                <Route path='/overview/reject/:event_id/:index' element={<RejectedUsers />}></Route>
            </Routes>
        </Box>
    );
}

export default AllRoutes;
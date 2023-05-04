import { Box } from '@chakra-ui/react';
import React from 'react'
import EventForm from '../Components/EventForm';
import { Navigate } from 'react-router-dom';

const Admin = () => {
    if (localStorage.getItem('token') === null) {
        return <Navigate to="/login" />
    };
    return (
        <Box>
            <EventForm />
        </Box>
    );
}

export default Admin;
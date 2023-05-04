import { Box, Heading, Input } from '@chakra-ui/react'
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEvent } from '../redux/Event/event.action';


const initialState = {
    name: '',
    desc: '',
    start: '',
    end: '',
    maxPlayer: ''
};
const EventForm = () => {
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        let { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(addEvent(formData));
        setFormData({
            desc: '',
            start: '',
            end: '',
            maxPlayer: '',
            name: ''
        });
    };


    const { desc, start, end, maxPlayer, name } = formData;
    return (
        <Box mt={["13%", "13%", "3%"]}>
            <Heading mb={["5%", "5%", "2%"]} fontSize={["22px", "22px", "24px"]} textAlign={"center"}>Create a new Sports Event</Heading>
            <form onSubmit={onSubmit} style={{ textAlign: "center" }}>
                <Box mb={['1.5%', '1.5%', '0.3%']}>
                    <Input w="300px" type={"text"} placeholder="Event Name" value={name} name="name" onChange={handleChange} />
                </Box>
                <Box>
                    <Input w="300px" type={"text"} placeholder="Description" value={desc} name="desc" onChange={handleChange} />
                </Box>
                <br />
                <label>Start Date: </label>
                <Box>
                    <Input w="300px" type={"date"} value={start} name="start" placeholder='Start Date' onChange={handleChange} />
                </Box>
                <br />
                <label>End Date: </label>
                <Box mb={['1.5%', '1.5%', '0.3%']}>
                    <Input w="300px" type={"date"} value={end} name="end" placeholder='End Date' onChange={handleChange} />
                </Box>
                <Box mb={['1.5%', '1.5%', '0.3%']}>
                    <Input w="300px" type={'number'} value={maxPlayer} name="maxPlayer" placeholder='Player Limit' onChange={handleChange} />
                </Box>
                <Input mb="1%" w="300px" style={{ backgroundColor: "blue", color: "white", border: "none", borderRadius: "10px", padding: "10px" }} type={"submit"} value="Create Event" />
            </form>
        </Box>
    )
}

export default EventForm;
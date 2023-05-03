import React, { useState } from 'react';
import { AiOutlineGoogle, AiOutlineTwitter, AiFillFacebook, AiFillGithub } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { backend_url } from './BackendURL';
import { Box, Heading, Input, useToast, Text, InputGroup, InputRightElement, Button } from '@chakra-ui/react';
import { VscEye, VscEyeClosed } from 'react-icons/vsc';



const initialState = {
  name: '',
  password: ''
};
const Login = () => {
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();
  const toast = useToast();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);


  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const onSubmit = async (e) => {
    e.preventDefault();
    let { name, password } = formData;
    if (name == '' || password == '') {
      toast({
        title: `Please Fill * required Field`,
        status: "info",
        isClosable: true,
      });
      return;
    };

    try {
      let res = await fetch(`${backend_url}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      });
      res = await res.json();
      if (res) {
        if (res.msg === "Wrong Password") {
          toast({
            title: `${res.msg}`,
            status: "warning",
            isClosable: true,
          });
        } else if (res.msg === "Wrong Username") {
          toast({
            title: `${res.msg}`,
            status: "warning",
            isClosable: true,
          });
        } else if (res.msg === "Login Successfully") {
          localStorage.setItem('name', formData.name);
          localStorage.setItem('token', res.token);
          localStorage.setItem('user_id', res.user_id);
          toast({
            title: `${res.msg}`,
            status: "success",
            isClosable: true,
          });
          navigate('/');
        }
      };

      setFormData({
        name: '',
        password: ''
      });
    } catch (err) {
      console.log(err);
    }
  };

  const { name, password } = formData;

  return (
    <Box style={{ textAlign: 'center' }}>
      <Heading mb="10px" style={{ textAlign: "center" }} fontSize={["22px", '22px', '26px']}>Sign in to your account</Heading>
      <Text mb={["20px", '20px', '15px']}>to enjoy all of our cool features ✌️</Text>
      <form onSubmit={onSubmit} style={{ textAlign: "center" }}>
        <Box className='input-icons'>
          <i class="fa fa-user icon"></i>
          <Input className='input-field' w="300px" type={"text"} placeholder="Enter Username" value={name} name="name" onChange={handleChange} />
        </Box>
        <Box className='input-icons' display={'flex'} justifyContent={'center'} alignItems={'center'}>
          <InputGroup size='md' w='300px'>
            <i class="fa fa-key icon"></i>
            <Input
              className='input-field'
              value={password}
              name="password"
              pr='4.5rem'
              type={show ? 'text' : 'password'}
              placeholder='Enter Password'
              onChange={handleChange}
              color="pink.700"
            />
            <InputRightElement width='4.5rem'>
              <Button variant={"outline"} h='1.75rem' size='sm' onClick={handleClick} color="pink.700">
                {show ? <VscEyeClosed /> : <VscEye />}
              </Button>
            </InputRightElement>
          </InputGroup>
        </Box>
        <Input w="300px" style={{ backgroundColor: "blue", color: "white", border: "none", borderRadius: "10px", padding: "10px" }} type={"submit"} value={"Sign in"} />
      </form>
      <p style={{ marginTop: "14px" }}>or continue with these social profile</p>
      <Box m="0px 0 8px 0" display={"flex"} justifyContent="center" alignItems={"center"} gap="5px">
        <a className='social-icon' target={"_blank"} href="https://github.com/topics/bug-tracker"><AiOutlineGoogle /></a>
        <a className='social-icon' target={"_blank"} href="https://github.com/topics/bug-tracker"><AiFillFacebook /> </a>
        <a className='social-icon' target={"_blank"} href="https://github.com/topics/bug-tracker"><AiOutlineTwitter /> </a>
        <a className='social-icon' target={"_blank"} href="https://github.com/topics/bug-tracker"><AiFillGithub /></a>
      </Box>
      <p>Cerate an account? <Link style={{ textDecoration: "none", color: "green" }} to={'/register'}>Sign up</Link></p>
    </Box>
  );
}

export default Login;
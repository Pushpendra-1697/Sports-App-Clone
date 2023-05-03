import { Avatar, Box, Button, Center, Flex, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Stack, useColorMode, useColorModeValue, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import '../Styles/Comman.css';
import { ReactNode } from 'react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import './navbar.css';


const NavLink = ({ children }: { children: ReactNode }) => (
    <Link
        px={2}
        py={1}
        rounded={'md'}
        _hover={{
            textDecoration: 'none',
            bg: useColorModeValue('gray.200', 'gray.700'),
        }}
        href={'#'}>
        {children}
    </Link>
);


const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('name');
        localStorage.removeItem('token');
        navigate('/login');
    };


    return (
        <Box mb={["35%", "35%", "10%"]}>
            <Box bg={useColorModeValue('goldenrod', 'gray.900')} px={4} position={"fixed"} top={"0.1px"} w="100%" zIndex={"100"}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <Link to="/"> <Image className='icon' w={"10px"} src="./logo.png" alt='logo' /> </Link>

                    <Text display={["none", "none", "block"]}><Link className='icon' to="/">Home</Link></Text>
                    <Text fontSize={["12px","12px","18px"]}><Link className='icon' to="/overview">Overview</Link></Text>
                    <Link className='icon' to="/admin"><i class="fa fa-user icon">Admin</i></Link>

                    <Flex alignItems={'center'}>
                        <Stack direction={'row'} spacing={7}>
                            <Button className='icon' onClick={toggleColorMode}>
                                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                            </Button>

                            <Menu>
                                <MenuButton
                                    className='icon'
                                    as={Button}
                                    rounded={'full'}
                                    variant={'link'}
                                    cursor={'pointer'}
                                    minW={0}>
                                    <Avatar
                                        size={'sm'}
                                        src={"profile"}
                                    />
                                </MenuButton>
                                <MenuList alignItems={'center'}>
                                    <br />
                                    <Center>
                                        <Avatar
                                            size={'2xl'}
                                            src={"profile"}
                                        />
                                    </Center>
                                    <br />
                                    <Center>
                                        <Text fontSize={"23px"}>
                                            <Link to="/admin">{localStorage.getItem('name')}</Link>
                                        </Text>
                                    </Center>
                                    <MenuDivider />
                                    <MenuItem> <Link to="/" className='Link'>Home</Link></MenuItem>
                                    <MenuItem><Link to="/login" className='Link'>Login</Link></MenuItem>
                                    <MenuItem><Link to="/register" className='Link'>Register</Link></MenuItem>
                                    <MenuItem><Button onClick={handleLogout} bg="black" color={"red"}>Logout</Button></MenuItem>
                                </MenuList>
                            </Menu>
                        </Stack>
                    </Flex>
                </Flex>
            </Box>
        </Box>
    );
}

export default Navbar;
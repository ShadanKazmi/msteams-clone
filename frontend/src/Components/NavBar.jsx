import React, { useState, useEffect, useContext } from 'react';
import { Icon, Menu, Dropdown, Image } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import { authContext } from '../api/AuthContext';
import Cookies from 'js-cookie';
import axios from 'axios';
import logo from '../Assets/logo.png'

const NavBar = () => {
    const navigate = useNavigate();
    const { logout, user } = useContext(authContext);
    const [currentUser, setCurrentUser] = useState('');

    useEffect(() => {
        const getCurrentUser = async () => {
            try {
                const userId = Cookies.get('userId');
                if (!userId) {
                    console.error('User ID not found in cookies.');
                    return null;
                }
                const response = await axios.get(`https://collab-app-backend.onrender.com/userAuth/${userId}`);
                setCurrentUser(response.data); 
            } catch (error) {
                console.error('Error fetching user:', error);
                return null;
            }
        };
        getCurrentUser();
    }, []);

    const handleUserSelect = (user) => {
        navigate('/profile', { state: { user } });
    };

    const handleLogout = () => {
        logout();
        navigate('/auth');
    };

    return (
        <div className="flex flex-col" style={{background: "linear-gradient(to left, #304352, #d7d2cc)"}}>
            {/* TOPBAR */}
            <div className="flex items-center justify-between p-4 bg-white text-white h-16 fixed w-full z-10" style={{background: "linear-gradient(to left, #304352, #d7d2cc)"}}>
                <div className="flex items-center justify-start">
                <Icon name='th' size='big'/>
                </div>
                <div className="flex items-center justify-center w-1/3">
                    <SearchBar onUserSelect={handleUserSelect} />
                </div>
                <div className="flex items-center justify-end w-1/3">
                    <Dropdown icon={<Icon name="user circle" size="big" color="black" />} pointing="top right">
                        <Dropdown.Menu>
                            <Dropdown.Header>Hi {currentUser.firstName} {currentUser.lastName}</Dropdown.Header>  
                            <Dropdown.Divider />      
                            <Dropdown.Item icon="user" text="Profile" onClick={() => navigate('/userProfile')} />   
                            <Dropdown.Item icon="sign-out" text="Logout" onClick={handleLogout} />
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
            <div className="flex mt-10" >
                {/* SIDEBAR */}
                <Menu vertical fixed="left" className="h-full w-56 bg-white" style={{ marginTop: '7.7vh',background: "linear-gradient(to top, #304352, #d7d2cc)" }}>
                    <Menu.Item onClick={() => navigate('/')}>
                        <Icon name="sitemap" />
                        Teams
                    </Menu.Item>
                    <Menu.Item onClick={() => navigate('/tasks')}>
                        <Icon name="tasks" />
                        Tasks
                    </Menu.Item>
                    <Menu.Item onClick={() => navigate('/chat')}>
                        <Icon name="chat" />
                        Chat
                    </Menu.Item>
                    <Image src={logo} style = {{marginTop:"58vh"}} />
                </Menu>
            </div>
        </div>
    );
};

export default NavBar;

import React, { useState } from 'react';
import MenuButton from '../MenuButton/MenuButton';

function Test() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState(null);

    const handlelogout = async () => {

        try {
            const response = await fetch('http://localhost:8000/api/v1/users/logout', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            console.log(await response.json())

            if (response.ok) {
                // Handle successful response from backend
                console.log('Data sent successfully');
                console.log(document.cookie)
            } else {
                // Handle errors
                console.error('Failed to send data');
            }
        } catch (error) {
            console.error('Error sending data:', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/api/v1/users/login', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            });

            console.log(await response.json());

            if (response.ok) {
                // Handle successful response from backend
                console.log('Data sent successfully');
            } else {
                // Handle errors
                console.error('Failed to send data');
            }
        } catch (error) {
            console.error('Error sending data:', error);
        }
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    fetch("http://localhost:8000/api/v1/users/current-user", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
    })
        .then(res => res.json())
        .then(res => console.log(res))

    return (

        <>

            <MenuButton />

            <form className='text-white' onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username : </label>
                    <input
                        className='text-black'
                        type="text"
                        id="username"
                        value={username}
                        onChange={handleUsernameChange}
                    />
                </div>
                <div>
                    <label htmlFor="image">Image : </label>
                    <input
                        className='text-black'
                        type="password"
                        id="password"
                        onChange={handlePasswordChange}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>

            <button onClick={handlelogout}>logout</button>

        </>

    );
}

export default Test;

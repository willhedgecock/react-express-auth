import axios from 'axios';
import { useState } from 'react';

export const LoginForm = () => {
    // to be used for the express post request
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [validationMessage, setValidationMessage] = useState('');

    // function to grab the user information to be passed to the express backend
    const verifyLogin = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/login', { username, password })
            .then((response) => {
                if (response.data.success) {
                    setValidationMessage(response.data.message);
                }
            })
            .catch((error) => {
                if (error.response && error.response.data && error.response.data.message) {
                    setValidationMessage(error.response.data.message);
                }
            });
    };

    return (
        <div className="form-container">
            <form onSubmit={verifyLogin} className="flex flex-col w-full p-4 md:w-xl m-auto justify-center gap-4 p-4 bg-white rounded shadow-lg">
                <label htmlFor="user-or-email" className="flex flex-col">
                    <span className="mb-2 text-gray-700">Username or Email Address</span>
                    <input
                        id="user-or-email"
                        type="text"
                        className="p-2 border border-gray-300 rounded"
                        placeholder="Enter your username or email address"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </label>
                <label htmlFor="password" className="flex flex-col">
                    <span className="mb-2 text-gray-700">Password</span>
                    <input
                        id="password"
                        type="password"
                        className="p-2 border border-gray-300 rounded"
                        placeholder="Enter your password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </label>
                <button type="submit" className="px-4 py-2 bg-slate-800 text-white rounded hover:bg-slate-600 w-32">Login</button>
            </form>
            {validationMessage && (
                <div className="mt-4 text-center text-red-500">
                    {validationMessage && (
                        <div
                            className={`mt-4 text-center ${validationMessage.toLowerCase().includes('success')
                                    ? 'text-green-600'
                                    : 'text-red-500'
                                }`}
                        >
                            {validationMessage}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
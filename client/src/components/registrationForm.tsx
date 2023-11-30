import React, { useState } from 'react';

interface RegistrationFormProps {
    onSubmit: (username: string, email: string, password: string) => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({onSubmit}) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Call the onSubmit function and pass username, email, and password
        onSubmit(username, email, password);
        // Clear the form after submission
        setUsername('');
        setEmail('');
        setPassword('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username" className={"mr-2"}>Username:</label>
                <input className={"border-2 border-gray-500 hover:border-black w-fit rounded-md mb-2"}
                       type="text"
                       id="username"
                       value={username}
                       placeholder={"nikhil"}
                       onChange={(e) => setUsername(e.target.value)}
                       required
                />
            </div>
            <div>
                <label htmlFor="email" className={"mr-2 p-4 "}>Email:</label>
                <input
                    className={"border-2 border-gray-500 hover:border-black w-fit rounded-md mb-2"}
                    type="email"
                    placeholder={"abc@gmail.com"}
                    id="email"
                    value={email}

                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className={"mb-5"}>
                <label htmlFor="password" className={"mr-2"}>Password:</label>
                <input
                    className={"border-2 border-gray-500 hover:border-black w-fit rounded-md mb-2"}
                    type="password"
                    id="password"
                    placeholder={"*&^%#@!"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit"
                    className={"bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"}>
                Register
            </button>
        </form>

    );
};

export default RegistrationForm;
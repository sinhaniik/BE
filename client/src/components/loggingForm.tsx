import React, {useState} from 'react';

interface LoginFormProps {
    onSubmit: (email: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({onSubmit}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Call the onSubmit function and pass email and password
        onSubmit(email, password);
        // Clear the form after submission
        setEmail('');
        setPassword('');
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email" className={"mr-2 p-3"}> Email: </label>
                    <input className={"border-2   border-gray-500 hover:border-black w-fit rounded-md mb-2"} type="email" id="email" value={email} placeholder={"nikhilsinha198@gmail.com"} onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className={"mb-5"}>
                    <label htmlFor="password" className={"mr-2"}  > Password: </label>
                    <input className={"border-2 border-gray-500 hover:border-black w-fit rounded-md mb-2"}  type="password" id="password" value={password} placeholder={"*&^%$#@!"}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <button type="submit"
                            className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"}>
                        Log In
                    </button>
                </div>
            </form>
        </div>

    );
};

export default LoginForm;

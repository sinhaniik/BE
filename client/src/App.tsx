import LoggingForm from "./components/loggingForm.tsx";
import RegistrationForm from "./components/registrationForm.tsx";
import {useState} from "react";

const App = () => {
    const [isLogging, setIsLogging] = useState(false)
    // Function to handle form submission (replace this with your authentication logic)
    const handleLogin = async (email: string, password: string) => {
        try {
            // Make API call to your authentication endpoint using 'email' and 'password'
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email, password}),
            });

            // Handle the response from the API
            if (response.ok) {
                // Authentication successful
                console.log('Authentication successful');
            } else {
                // Authentication failed, handle error i.e display error message
                console.error('Authentication failed');
            }
        } catch (error: any) {
            console.error('Error during authentication:', error);
        }
    }

    // Function to handle form Registration
    const handleRegistration = async (username: string, email: string, password: string) => {
        try {
            // Make API call to your registration/authentication endpoint using 'username', 'email', and 'password'
            const response = await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username, email, password}),
            });

            // Handle the response from the API
            if (response.ok) {
                // Registration successful, perform further actions (e.g., redirect to login page)
                console.log('Registration successful');
            } else {
                // Registration failed, handle error (e.g., display error message)
                console.error('Registration failed');
            }
        } catch (error: any) {
            console.error('Error during registration:', error);
        }
    };

    return (
        <div className={"flex flex-col items-center justify-center h-screen w-screen"}>
            <h1 className={"text-3xl font-bold mb-6 text-gray-900"}>Logging and Registration page</h1>
            <div className={"mb-5"}>
                <button
                    onClick={() => setIsLogging(true)}
                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2 ${
                        isLogging ? 'bg-blue-700' : ''
                    }`}
                >
                    Logging
                </button>
                <button
                    onClick={() => setIsLogging(false)}
                    className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                        !isLogging ? 'bg-green-700' : ''
                    }`}
                >
                    Registration
                </button>
            </div>

            {isLogging ? <LoggingForm onSubmit={handleLogin}/> : <RegistrationForm onSubmit={handleRegistration}/>}
        </div>
    );
};

export default App

import { useState } from "react";

export default function Login(props) {

    const setUser = props.setUser;
    const [login, setLogin] = useState(true);

    const handleLogin = (e) => {
        e.preventDefault();
        const username = e.target.username.value.trim();
        
        fetch("/api/login", {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({ username })
        })
        .then(response => response.json())
        .then(data => {
            if(data.error) {
                alert("Utente non trovato!");
            }else{
                setUser(data);
            }
        })
    }
    
    const handleSignUp = (e) => {
        e.preventDefault();
        const username = e.target.username.value.trim();
        const name = e.target.name.value.trim();
        const surname = e.target.surname.value.trim();
        const phone = e.target.phone.value.trim();

        const data = {
            Username : username,
            Name : name,
            Surname : surname,
            Number : phone
        };

        fetch("/api/signup", {
            method: "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            if(data.error) {
                alert(data.error);
            }else{
                setUser(data);
            }
        })
    } 

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            {login ? (
                <div className="bg-white p-10 rounded-xl shadow-xl w-full max-w-md">
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Login</h1>
                    <form onSubmit={handleLogin} className="space-y-6">
                    <div className="flex flex-col">
                        <label htmlFor="username" className="text-gray-700 font-semibold mb-2">
                        Username
                        </label>
                        <input
                        id="username"
                        name="username"
                        type="text"
                        placeholder="Username"
                        required
                        className="bg-gray-100 border border-gray-300 rounded-md px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                        />
                    </div>
                    <input
                        type="submit"
                        value="Login"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-md cursor-pointer transition"
                    />
                    </form>
                    <button className="text-left mt-3 font-bold text-gray-700" onClick={() => setLogin(false)}>Sign up</button>
                </div>
            ) : (
                <div className="bg-white p-10 rounded-xl shadow-xl w-full max-w-md">
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Login</h1>
                    <form onSubmit={handleSignUp} className="space-y-6">
                    <div className="flex flex-col">
                        <label htmlFor="username" className="text-gray-700 font-semibold mb-2">
                        Username
                        </label>
                        <input
                        id="username"
                        name="username"
                        type="text"
                        placeholder="Username"
                        required
                        className="bg-gray-100 border border-gray-300 rounded-md px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                        />
                        <label htmlFor="" className="text-gray-700 font-semibold mb-2">
                        Name
                        </label>
                        <input 
                        id="name" 
                        name="name" 
                        type="text" 
                        placeholder="Name"
                        className="bg-gray-100 border border-gray-300 rounded-md px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"/>
                        <label htmlFor="" className="text-gray-700 font-semibold mb-2">
                        Surname
                        </label>
                        <input 
                        id="surname" 
                        type="text" 
                        name="surname" 
                        placeholder="Surname"
                        required
                        className="bg-gray-100 border border-gray-300 rounded-md px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"/>
                        <label htmlFor="" className="text-gray-700 font-semibold mb-2">
                        Phone Number
                        </label>
                        <input 
                        id="phone" 
                        name="phone" 
                        type="tel" 
                        placeholder="Phone number"
                        required
                        className="bg-gray-100 border border-gray-300 rounded-md px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"/>
                    </div>
                    <input
                        type="submit"
                        value="Sign up"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-md cursor-pointer transition"
                    />
                    </form>
                    <button className="text-left mt-3 font-bold text-gray-700" onClick={() => setLogin(true)}>Login</button>
                </div>
            )}
        </div>
    );  
}
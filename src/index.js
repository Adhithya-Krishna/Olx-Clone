import React, { useState } from "react";
import ReactDOM from 'react-dom/client';
import App from "./App";
import { FirebaseProvider, AuthContext } from './store/FirebaseContext'
import app from './firebase/config'

const root = ReactDOM.createRoot(document.getElementById("root"));

// const root = ReactDOM.createRoot(document.getElementById("root"));

const MainApp = () => {
    const [authUser, setAuthUser] = useState(null);

    return (
        <FirebaseProvider value={{ app }}>
            <AuthContext.Provider value={{ authUser, setAuthUser }}>
                <App />
            </AuthContext.Provider>
        </FirebaseProvider>
    );
};

root.render(<MainApp />);

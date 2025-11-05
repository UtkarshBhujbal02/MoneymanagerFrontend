import React from "react";
import ReactDom from "react-dom/client";
import './index.css'
import App from './App.jsx'
import {AppContextProvider} from "./context/AppContext.jsx";

ReactDom.createRoot(document.getElementById('root')).render(
    <AppContextProvider>
        <App/>
    </AppContextProvider>
)

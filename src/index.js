import React from "react"
import App from "./components/App.js"
import './styles/global.css'
import { createRoot } from 'react-dom/client';

const rootNode = document.getElementById('root');
const root = createRoot(rootNode);

root.render(
    <App />
);
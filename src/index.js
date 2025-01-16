import React from 'react';
import ReactDOM from 'react-dom/client';
import QueryBox from './components/queryBox';
import './styles/queryBox.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <QueryBox />
    </React.StrictMode>
);
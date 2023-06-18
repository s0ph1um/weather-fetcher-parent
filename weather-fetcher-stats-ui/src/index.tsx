import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {ModalState} from './context/ModalContext';

ReactDOM.render(
    <BrowserRouter>
        <ModalState>
            <React.StrictMode>
                <App/>
            </React.StrictMode>
        </ModalState>
    </BrowserRouter>,
    document.getElementById('root') as HTMLElement
);

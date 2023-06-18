import {Route, Routes} from 'react-router-dom'
import React from 'react';
import {RequestStatsPage} from "./RequestStatsPage";

const App: React.FC = () => (
    <Routes>
        <Route path="/" element={<RequestStatsPage/>}/>
    </Routes>
)

export default App;

import {Route, Routes} from 'react-router-dom'
import React from 'react';
import {RequestStatsPage} from "./components/request-stats/RequestStatsPage";

const App: React.FC = () => (
    <Routes>
        <Route path="/" element={<RequestStatsPage/>}/>
    </Routes>
)

export default App;

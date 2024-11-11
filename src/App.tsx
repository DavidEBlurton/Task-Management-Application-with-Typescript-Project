import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  // For routing
import TaskDashboard from './components/TaskDashboard';  // Example import for your task dashboard

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<TaskDashboard />} />
                {/* Add other routes here */}
            </Routes>
        </Router>
    );
};

export default App;  // Ensure that you are exporting the App component correctly


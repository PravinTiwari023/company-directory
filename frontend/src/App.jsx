import React, { useState } from 'react';
import CompanyList from './components/CompanyList';
import AddCompany from './components/AddCompany';
import './App.css';

function App() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleCompanyAdded = () => {
    // Trigger refresh of company list
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="app">
      <div className="app-container">
        {/* App Header */}
        <header className="app-header">
          <h1>Company Management System</h1>
          <p>Manage your company directory with ease</p>
        </header>

        {/* Main Content */}
        <main className="app-content">
          <CompanyList 
            onAddCompany={handleOpenAddModal}
            refreshTrigger={refreshTrigger}
          />
        </main>

        {/* Add Company Modal */}
        <AddCompany
          isOpen={isAddModalOpen}
          onClose={handleCloseAddModal}
          onCompanyAdded={handleCompanyAdded}
        />
      </div>
    </div>
  );
}

export default App;
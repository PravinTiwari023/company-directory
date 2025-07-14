import React, { useState, useEffect } from 'react';
import { companyAPI } from '../services/api';

const CompanyList = ({ onAddCompany, refreshTrigger }) => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await companyAPI.getAll();
      setCompanies(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, [refreshTrigger]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this company?')) {
      return;
    }

    try {
      setDeletingId(id);
      await companyAPI.delete(id);
      setCompanies(companies.filter(company => company.id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="company-list">
        <div className="list-header">
          <h2>Companies</h2>
          <button className="btn-primary" onClick={onAddCompany}>
            + Add Company
          </button>
        </div>
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading companies...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="company-list">
        <div className="list-header">
          <h2>Companies</h2>
          <button className="btn-primary" onClick={onAddCompany}>
            + Add Company
          </button>
        </div>
        <div className="error-state">
          <p className="error-message">Error: {error}</p>
          <button className="btn-secondary" onClick={fetchCompanies}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="company-list">
      <div className="list-header">
        <h2>Companies ({companies.length})</h2>
        <button className="btn-primary" onClick={onAddCompany}>
          + Add Company
        </button>
      </div>

      {companies.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🏢</div>
          <h3>No companies found</h3>
          <p>Get started by adding your first company</p>
          <button className="btn-primary" onClick={onAddCompany}>
            Add Company
          </button>
        </div>
      ) : (
        <div className="companies-grid">
          {companies.map((company) => (
            <div key={company.id} className="company-card">
              <div className="company-header">
                <div className="company-icon">🏢</div>
                <div className="company-actions">
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(company.id)}
                    disabled={deletingId === company.id}
                    title="Delete company"
                  >
                    {deletingId === company.id ? (
                      <span className="spinner-small"></span>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              <div className="company-content">
                <h3 className="company-name">{company.name}</h3>
                <p className="company-location">📍 {company.location}</p>
                <div className="company-id">ID: {company.id}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompanyList;
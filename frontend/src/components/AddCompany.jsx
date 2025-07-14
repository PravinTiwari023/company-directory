import React, { useState } from 'react';
import { companyAPI } from '../services/api';

const AddCompany = ({ isOpen, onClose, onCompanyAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    location: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.location.trim()) {
      setError('Both name and location are required');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const newCompany = await companyAPI.create({
        name: formData.name.trim(),
        location: formData.location.trim()
      });

      // Reset form
      setFormData({ name: '', location: '' });
      
      // Notify parent component
      onCompanyAdded(newCompany);
      
      // Close modal
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setFormData({ name: '', location: '' });
      setError(null);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Add New Company</h3>
          <button 
            className="modal-close" 
            onClick={handleClose}
            disabled={loading}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="company-form">
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="name">Company Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter company name"
              disabled={loading}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">Location *</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Enter company location"
              disabled={loading}
              required
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={handleClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={loading || !formData.name.trim() || !formData.location.trim()}
            >
              {loading ? (
                <>
                  <span className="spinner-small"></span>
                  Adding...
                </>
              ) : (
                'Add Company'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCompany;
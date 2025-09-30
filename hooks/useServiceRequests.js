'use client';

import { useState, useEffect } from 'react';

export const useServiceRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/service-requests');
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch requests');
      }
      
      setRequests(data.requests);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createRequest = async (requestData) => {
    try {
      const response = await fetch('/api/service-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create request');
      }
      
      // Refresh the list
      await fetchRequests();
      
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateRequest = async (id, updates) => {
    try {
      const response = await fetch(`/api/service-requests/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to update request');
      }
      
      // Refresh the list
      await fetchRequests();
      
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteRequest = async (id) => {
    try {
      const response = await fetch(`/api/service-requests/${id}`, {
        method: 'DELETE',
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete request');
      }
      
      // Refresh the list
      await fetchRequests();
      
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return {
    requests,
    loading,
    error,
    createRequest,
    updateRequest,
    deleteRequest,
    refreshRequests: fetchRequests,
  };
};
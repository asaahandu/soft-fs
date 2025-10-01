'use client';
import { useState } from 'react';

export function useServiceRequests() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const createRequest = async (requestData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call - replace with actual Firebase implementation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Service request submitted:', requestData);
      
      // Return success result
      return {
        id: Date.now().toString(),
        ...requestData,
        status: 'pending',
        createdAt: new Date().toISOString()
      };
    } catch (err) {
      setError(err.message || 'Une erreur est survenue');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createRequest,
    isLoading,
    error
  };
}
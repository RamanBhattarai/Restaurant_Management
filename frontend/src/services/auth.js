import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  // Mock user database
  const mockUsers = [
    {
      id: 1,
      name: 'Test User',
      email: 'user@example.com',
      password: 'password123',
      userType: 'customer',
    },
    {
      id: 2,
      name: 'Staff User',
      email: 'staff@example.com',
      password: 'password123',
      userType: 'staff',
    },
  ];

  // Mock API calls
  const login = async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = mockUsers.find(
          (u) => u.email === email && u.password === password
        );
        if (user) {
          setCurrentUser(user);
          resolve(user);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 500);
    });
  };

  const register = async (userData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Check if user already exists
        if (mockUsers.some((u) => u.email === userData.email)) {
          reject(new Error('User already exists'));
          return;
        }
        
        // Validate staff code (mock validation)
        if (userData.userType === 'staff' && userData.staffCode !== 'STAFF123') {
          reject(new Error('Invalid staff code'));
          return;
        }
        
        const newUser = {
          id: mockUsers.length + 1,
          name: userData.name,
          email: userData.email,
          password: userData.password,
          userType: userData.userType,
        };
        
        mockUsers.push(newUser);
        resolve(newUser);
      }, 500);
    });
  };

  const logout = () => {
    setCurrentUser(null);
    navigate('/login');
  };

  const resetPassword = async (email) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // In a real app, we would send an email here
        resolve();
      }, 500);
    });
  };

  const updateProfile = async (profileData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!currentUser) {
          reject(new Error('Not authenticated'));
          return;
        }
        
        // Find and update user in mock database
        const userIndex = mockUsers.findIndex((u) => u.id === currentUser.id);
        if (userIndex === -1) {
          reject(new Error('User not found'));
          return;
        }
        
        mockUsers[userIndex] = {
          ...mockUsers[userIndex],
          name: profileData.name,
          email: profileData.email,
        };
        
        setCurrentUser(mockUsers[userIndex]);
        resolve(mockUsers[userIndex]);
      }, 500);
    });
  };

  const changePassword = async (currentPassword, newPassword) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!currentUser) {
          reject(new Error('Not authenticated'));
          return;
        }
        
        // Find user in mock database
        const userIndex = mockUsers.findIndex((u) => u.id === currentUser.id);
        if (userIndex === -1) {
          reject(new Error('User not found'));
          return;
        }
        
        // Verify current password
        if (mockUsers[userIndex].password !== currentPassword) {
          reject(new Error('Current password is incorrect'));
          return;
        }
        
        // Update password
        mockUsers[userIndex].password = newPassword;
        setCurrentUser(mockUsers[userIndex]);
        resolve();
      }, 500);
    });
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        register,
        logout,
        resetPassword,
        updateProfile,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
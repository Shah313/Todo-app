import React from "react";

import "./Messages.css";

import { useState, useEffect } from 'react';

import { useRef } from 'react';



function Messages({ errorMessage, successMessage }) {

  const [showError, setShowError] = useState(true);

  const timeoutIdRef = useRef(null);


  useEffect(() => {
    if (errorMessage) {
        timeoutIdRef.current = setTimeout(() => setShowError(false), 3000);
    }
    return () => clearTimeout(timeoutIdRef.current);
}, [errorMessage]);


useEffect(() => {
  if (successMessage) {
      timeoutIdRef.current = setTimeout(() => setShowError(false), 3000);
  }
  return () => clearTimeout(timeoutIdRef.current);
}, [successMessage]);



  return (
    <>
        {showError && errorMessage && (
        <div className="alert-success">
          <i className="fas fa-check-circle icon"></i>
          <span>{errorMessage}</span>
        </div>
      )}

 {showError && successMessage && (
    <div className="alert-success">
        <i className="fas fa-check-circle icon"></i>
        <span>{successMessage}</span>
    </div>
)}


   
    </>
  );
}

export default Messages;

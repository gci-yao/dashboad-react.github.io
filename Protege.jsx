import React from 'react'
import { Navigate } from 'react-router-dom'

export default function Protege({estConnecte, children}) {
  if(!estConnecte) return 
  <>
    <Navigate to="/" />
  </>;
  return <>
    <h2>{children}</h2>
  </>
};

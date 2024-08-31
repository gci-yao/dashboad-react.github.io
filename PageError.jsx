import React from 'react'
import { useRouteError } from 'react-router-dom'

export default function PageError() {
    const {error} = useRouteError();
  return (
    <div>
        <h2>{error.statusText || error.message}</h2>
    </div>
  )
}

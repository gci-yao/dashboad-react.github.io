import React from 'react'
import { useParams } from 'react-router-dom'

export default function IdApp() {
    const {id} = useParams();
  return (
    <>
      <div>
          <h2>L'Id de APP est :{id}</h2>
      </div>
    </>
  )
}

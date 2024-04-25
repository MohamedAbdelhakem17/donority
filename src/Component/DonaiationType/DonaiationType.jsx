import React from 'react'
import { useParams } from 'react-router-dom'

export default function DonaiationType() {
    const { type } = useParams()
    return (
        <div className='fw-bold bg-danger text-center h1 text-white' >Donaiation Type  {type}</div>
    )
}

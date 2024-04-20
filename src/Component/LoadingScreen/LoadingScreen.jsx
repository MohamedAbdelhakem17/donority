import React from 'react'
import icon from "./loading.gif"

export default function LoadingScreen() {
  return (
    <>
      <section className='loading-screen'>
        <img src={icon} alt="Donority" />
      </section>
    </>
  )
}

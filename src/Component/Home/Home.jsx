import React from 'react'
import Donations from './Sections/Donations/Donations'
import Hero from './Sections/Hero/Hero'

export default function Home({ apiLink }) {
  return (
    <>
      <Hero />
      <Donations apiLink={apiLink} />
    </>
  )
}

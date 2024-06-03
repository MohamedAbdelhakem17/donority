import React from 'react'
import Donations from './Sections/Donations/Donations'
import Hero from './Sections/Hero/Hero'
import DownlodeApp from './Sections/DownlodeApp/DownlodeApp'
import {Helmet} from "react-helmet";


export default function Home({ apiLink }) {
  return (
    <>
    
      <Helmet>
        <title>DONORITY</title>
      </Helmet>
      <Hero />
      <Donations apiLink={apiLink} />
      <DownlodeApp />
    </>
  )
}

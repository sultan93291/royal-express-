/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import Header from "./Header"
import { Outlet } from 'react-router-dom'

export default function Layout() {
  
  return (
    <main>
      <Header />
      <Outlet/>
    </main>
  )
}

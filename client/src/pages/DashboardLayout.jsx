import React, { createContext, useContext, useState } from 'react'
import { Outlet, redirect, useLoaderData, useNavigate } from 'react-router-dom'
import Wrapper from '../assets/wrappers/Dashboard'
import { BigSidebar, Navbar, SmalSidbar } from '../components'
import { checkDefaultTheme } from '../App'
import customFetch from '../utils/customAxios'
export const loader = async ()=>{
  try {
    const data = await customFetch('/users-new/current-user')
    return data
  } catch (error) {
    return redirect('/')
  }
}
const DashboardContext = createContext()

const DashboardLayout = () => {
  //temp
 const {data} = useLoaderData()
console.log(data);
  const user = data
 const  [showSibar, setShowSidebar]=useState(false)
 const  [isDarkTheme, setIsDarkTheme]=useState(checkDefaultTheme())
 const navigate = useNavigate()

 const toggleDarktheme = ()=>{
  const newDark = !isDarkTheme
  setIsDarkTheme(newDark)
  document.body.classList.toggle('dark-theme', newDark)
  localStorage.setItem('darkTheme',newDark)
 }
  const toggleSidebar = ()=>{
  setShowSidebar(!showSibar)
 }
 const logoutUser = async()=>{
  navigate('/')
  await customFetch('/users/logout')
 }
  return (
    <DashboardContext.Provider 
    value={{user, showSibar, isDarkTheme, toggleDarktheme, toggleSidebar, logoutUser}}>
    <Wrapper>
      <main className="dashboard">
        <SmalSidbar />
        <BigSidebar/>
        <div>
          <Navbar/>
          <div className="dashboard-page">
            <Outlet context={{user}}/>
          </div>
        </div>
      </main>
    </Wrapper>
    </DashboardContext.Provider>
  )
}

export const useDashboardContext = ()=> useContext(DashboardContext)

export default DashboardLayout
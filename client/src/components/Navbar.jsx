import Wrapper from '../assets/wrappers/Navbar'
import React from 'react'
import Logo from './Logo'
import { useDashboardContext } from '../pages/DashboardLayout'
import { LogoutContainer } from '.'
import ThemeToggle from './ThemeToggle'

const Navbar = () => {
const {toggleSidebar} = useDashboardContext()
  return (
    <Wrapper>
        <div className="nav-center">
            <button className="toggle-btn" type='button' onClick={toggleSidebar}>
                Click
            </button>
            <div className="">
                <Logo/>
                <h4 className="logo-text">Dashboard</h4>
            </div>
            <div className="btn-container">
                <ThemeToggle/>
                <LogoutContainer/>
            </div>
        </div>
    </Wrapper>
  )
}

export default Navbar
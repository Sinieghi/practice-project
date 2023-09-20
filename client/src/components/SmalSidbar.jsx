import React from 'react'
import Wrapper from '../assets/wrappers/SmallSidebar'
import { useDashboardContext } from '../pages/DashboardLayout'
import links from '../utils/links'
import Logo from './Logo'
import { NavLink } from 'react-router-dom'
import NavLinks from './NavLinks'
const SmalSidbar = () => {
    const {showSibar, toggleSidebar} = useDashboardContext()
  return (
    <Wrapper>
        <div className={showSibar?`sidebar-container show-sidebar`:'sidebar-container'}>
            <div className="content">
                <button className='close-btn' onClick={toggleSidebar} type='button'>
                    X
                </button>
                <header>
                    <Logo/>
                </header>
                <NavLinks/>
            </div>

        </div>
    </Wrapper>
  )
}

export default SmalSidbar
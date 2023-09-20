import React from 'react'
import Wrapper from '../assets/wrappers/BigSidebar'
import NavLinks from './NavLinks'
import Logo from './Logo'
import { useDashboardContext } from '../pages/DashboardLayout'

const BigSidebar = () => {
    const {showSibar} = useDashboardContext()
    return (
    <Wrapper>
        <div className={showSibar?'sidebar-container':'sidebar-containe show-sidebar'}>
            <div className="content">
                <header>
                    <Logo/>
                </header>
                <NavLinks isBigSidebar/>
            </div>
        </div>
    </Wrapper>
  )
}

export default BigSidebar
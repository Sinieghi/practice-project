import React from 'react'
import { NavLink } from "react-router-dom";
import { useDashboardContext } from '../pages/DashboardLayout';
import links from '../utils/links';
const NavLinks = ({isBigSidebar}) => {
    const { toggleSidebar, user, path} = useDashboardContext()
    const {role} = user
    if(path === 'admin' && role !== 'admin') return
  return (
                    <div className="nav-links">
                    {links.map((link)=>{
                        const {text, path} = link
                        return <NavLink to={path} key={text}  className='nav-link' onClick={toggleSidebar}>
                            <span className='icon'>
                            </span>
                            {text}
                        </NavLink>
                    })}
                </div>
  )
}

export default NavLinks
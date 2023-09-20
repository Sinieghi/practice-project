import React from 'react'
import Wrapper from '../assets/wrappers/ThemeToggle';
import { useDashboardContext } from '../pages/DashboardLayout';
const ThemeToggle = () => {
    const {isDarkTheme,toggleDarktheme} = useDashboardContext()
  return (
    <Wrapper onClick={toggleDarktheme}>
        {isDarkTheme? <a type='button' className='toggle-icon'>sun</a> :<a type='button' className='toggle-icon'>mon</a>}

    </Wrapper>
  )
}

export default ThemeToggle
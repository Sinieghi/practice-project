import React from 'react'
import Wrapper from '../assets/wrappers/LandingPage'
import main from '../assets/images/main.svg'
import logo from '../assets/images/logo.svg'
import {Link} from 'react-router-dom'
import { Logo } from '../components'
const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo/>
      </nav>
      <div className="container page">
        <div className="info">
          <h1>job <span>tracking</span> app</h1>
         <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet enim animi est odit eum quia quidem obcaecati iste eius officiis accusamus, repudiandae, earum veniam quam rem! Id iure odit voluptate distinctio, eaque architecto quibusdam perspiciatis eius quos. Recusandae iste atque vitae quo numquam earum cum inventore consequuntur nostrum sapiente. Iste corporis magnam perferendis repellendus unde, nulla aliquid neque hic laboriosam a laborum dolore excepturi numquam eaque alias aspernatur nam ipsam.          
         </p>
         <Link to='/register' className='btn register-link'>
          register
         </Link>
         <Link to='/login' className='btn login-link'>
          login/demo user
         </Link>
        </div>
        <img src={main} alt="main" className='img main-img'/>
      </div>
      </Wrapper>
  )
}


export default Landing
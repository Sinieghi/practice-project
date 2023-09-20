import React from 'react'
import { FaSuitcaseRolling, FaCalendarCheck } from 'react-icons/fa';
import { useLoaderData, redirect } from 'react-router-dom';
import Wrapper from '../assets/wrappers/StatsContainer';
import { toast } from 'react-toastify';
import customFetch from '../utils/customAxios';
import { StatItems } from '../components';
export const loader = async ()=>{
  try {
    const {data} = await customFetch('/users-new/admin/app-status')
    return data
  } catch (error) {
    toast.error('Not authorized to access')
    return redirect('/dashboard')
  }
}
const Adim = () => {
  const {users, jobs} = useLoaderData()
  return (
    <Wrapper>
      <StatItems title='current users' count={users} color='#e9b949' bcg='#fcefct' icon={<FaSuitcaseRolling/>}/>
      <StatItems title='Total jobs' count={users} color='#647acb' bcg='#e0e8f9' icon={<FaCalendarCheck/>}/>
    </Wrapper>
  )
}

export default Adim
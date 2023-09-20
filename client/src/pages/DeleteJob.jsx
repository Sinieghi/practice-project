import React from 'react'
import customFetch from '../utils/customAxios'
import { toast } from 'react-toastify'
import { redirect } from 'react-router-dom'
export const action = async({params})=>{
  try {
    await customFetch.delete(`/jobs/${params.id}`)
    toast.success('deleted')
    return redirect('/dashboard/all-jobs')
  } catch (error) {
     toast.error('fail')
     console.log(error);
     return redirect('/dashboard/all-jobs')
  }

}
const DeleteJob = () => {
  return (
    <div>DeleteJob</div>
  )
}

export default DeleteJob
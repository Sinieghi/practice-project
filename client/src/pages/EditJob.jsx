import React from 'react'
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useLoaderData, useNavigation, useParams } from 'react-router-dom';
import { Form, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import FormRowSelect from '../components/FormRowSelect';
import customFetch from '../utils/customAxios';
import { FormRow, SubmitBtn } from '../components';
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constantes';

export const loader = async ({params})=>{
  console.log(params);
  try {
    const {data} = await customFetch(`/jobs/${params.id}`)
    return data
  } catch (error) {
   toast.error(error?.response?.data?.msg)  
   return redirect('/dashboard/all-jobs')  
  }
}
export const actions = async ({request, params})=>{
  const formData = await request.formData()
  console.log(formData);
  const data = Object.fromEntries(formData)
  console.log(data);
  try {
    await customFetch.patch(`/jobs/${params.id}`, data)
    toast.success('Edited')
  } catch (error) {
    return redirect('/dashboard/all-jobs')
    return error
    
  }
  return null
}

const EditJob = () => {
  const {job} = useLoaderData()
  return (
    <Wrapper>
      <Form method='post' className='form'>
        <h4 className='form-title'>edit job</h4>
        <div className="form-center">
          <FormRow type='text' name='position' defaultValue={job.position}/>
          <FormRow type='text' name='company' defaultValue={job.company}/>
          <FormRow type='text' labeltext={job.jobLocation} name='jobLocation' defaultValue={job.jobLocation}/>
          <FormRowSelect name='jobStatus' labelText='job status' defaultValue={job.jobStatus} list={Object.values(JOB_STATUS)}/>
          <FormRowSelect name='jobType' labelText='job type' defaultValue={job.jobType} list={Object.values(JOB_TYPE)}/>
           <SubmitBtn formBtn/>
        </div>
      </Form>
    </Wrapper>
  )
}

export default EditJob
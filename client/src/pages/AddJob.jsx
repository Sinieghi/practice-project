import React from 'react'
import { FormRow, SubmitBtn } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useOutletContext } from 'react-router-dom';
import { Form, useNavigation, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constantes';
import FormRowSelect from '../components/FormRowSelect';
import customFetch from '../utils/customAxios';
export const actions = async ({request})=>{
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  try {
    await customFetch.post('/jobs', data)
    toast.success('success!')
    return redirect('/dashboard/all-jobs')
  } catch (error) {
    toast.error('somethin went wurong')
    return error
  }
}
const AddJob = () => {
  const {user} = useOutletContext()
  return (
    <Wrapper>
      <Form method='post' className='form'>
        <h4 className='form-title'>add job</h4>
        <div className="form-center">
          <FormRow type='text' name='position'/>
          <FormRow type='text' labeltext='Job location' defaultValue={user.location} name='jobLocation'/>
          <FormRow type='text' name='company'/>
           <FormRowSelect name='jobStatus' labelText='job status'  defaultValue={JOB_STATUS.PENDING} list={Object.values(JOB_STATUS)}/>
           <FormRowSelect name='jobType' labelText='job type'  defaultValue={JOB_TYPE.PENDING} list={Object.values(JOB_TYPE)}/>
           <SubmitBtn formBtn/>
        </div>
      </Form>
    </Wrapper>
  )
}

export default AddJob
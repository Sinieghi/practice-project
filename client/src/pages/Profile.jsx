import React from 'react'
import { Form, useNavigation, useOutletContext } from 'react-router-dom'
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { FormRow, SubmitBtn } from '../components';
import { toast } from 'react-toastify';
import customFetch from '../utils/customAxios';

export const action = async({request})=>{
const formData = await request.formData();
const file = formData.get('avatar')
if(file && file.size > 500000){
  toast.error('The image is to big')
  return null
}
try {
  await customFetch.patch('/users-new/update-user', formData)
  toast.success('Done')
} catch (error) {
  toast.error('Fail')
 
  
}
return null
}

const Profile = () => {
  const {user} = useOutletContext()
  const {lastName, name, email, location} = user
  //setupe de enviar image para o server, encType e o input avatar, e no back usa multer package
  return (
    <Wrapper>
      <Form method='post' className='form' encType='multipart/form-data'>
        <h4 className='form-title'>Profile</h4>
        <div className="form-center">
          <div className="form-row">
            <label htmlFor="avatar" className="form-laber">
              Max size (0.5mb)
            </label>
            <input type="file" name="avatar" id="avatar" className='form-input' accept='image/*' />
          </div>
          <FormRow type='text' name='name' defaultValue={name}/>
          <FormRow type='text' name='lastName' labeltext='last name' defaultValue={lastName}/>
          <FormRow type='email' name='email' defaultValue={email}/>
          <FormRow type='text' name='location' defaultValue={location}/>
           <SubmitBtn formBtn/>
        </div>
      </Form>
    </Wrapper>
  )
}

export default Profile
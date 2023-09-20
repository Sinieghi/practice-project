import React from 'react'
import { useNavigation } from 'react-router-dom'

const SubmitBtn = ({formBtn}) => {
    const navigation = useNavigation( )
  const isSubmmiting = navigation.state === 'submitting'
  return (
              <button type='submit' className={`btn btn-block ${formBtn && 'form-btn'}`} disabled={isSubmmiting}>
            {isSubmmiting ? 'submitting':'submit'}
          </button>
  )
}

export default SubmitBtn
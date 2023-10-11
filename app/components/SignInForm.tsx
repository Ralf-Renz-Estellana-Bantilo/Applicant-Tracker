'use client'

import React from 'react'
import { UmpisaLogo } from '@/icons/icons'
import { Button } from '@nextui-org/react'
import { signIn } from 'next-auth/react'

const SignInForm = () =>
{
   const handleSignIn = () =>
   {
      const callbackUrl = 'http://localhost:3000/dashboard'
      signIn( 'google', { callbackUrl } )
   }

   return (
      <div className='flex items-center justify-center w-full h-full'>
         <div className="flex flex-col gap-4 min-w-[300px] border-1 border-border-color rounded-lg p-3 bg-green-300 backdrop-filter backdrop-blur-sm bg-opacity-10">
            <div className="flex flex-col justify-center items-center w-full">
               <span className='text-success'><UmpisaLogo /></span>
               <h2 className="font-bold text-accent-primary select-none">APPLICANT TRACKER</h2>
            </div>
            <div className="flex flex-col justify-center">
               <Button color="success" onClick={handleSignIn} className='font-semibold rounded-lg' variant="solid">
                  SIGN IN using GOOGLE
               </Button>
            </div>
         </div>
      </div>
   )
}

export default SignInForm
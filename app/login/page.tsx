import React from 'react'
import SignInForm from '../components/SignInForm'
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const LoginPage = async () =>
{
   const session = await getServerSession();
   if ( session )
   {
      redirect( "/dashboard" );
   }

   return (
      <SignInForm />
   )
}

export default LoginPage
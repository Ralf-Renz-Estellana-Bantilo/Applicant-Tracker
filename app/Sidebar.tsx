'use client'

import React, { useContext } from 'react'
import SidebarButton from "./components/SidebarButton";
import { ComponentContext } from './context/context';
import { Avatar, Button } from '@nextui-org/react';
import { UmpisaLogo } from '@/icons/icons';
import { signIn, signOut, useSession } from 'next-auth/react'

const Sidebar = () =>
{
   const { data } = useSession()
   const context = useContext( ComponentContext )

   const handleSignout = () =>
   {
      signOut()
   }

   return (
      <aside className="flex flex-col justify-between min-h-screen border-r-1 border-border-color">
         <div className="flex flex-col">
            <div className="flex flex-col items-center text-success justify-center w-64 border-b-1 border-border-color h-[12vh]">
               <UmpisaLogo />
               <h2 className="font-bold text-accent-primary select-none">APPLICANT TRACKER</h2>
            </div>
            <div className="flex flex-col p-3 gap-1 w-64 h-full">
               {context?.routes.map( route => (
                  <SidebarButton key={route.id} text={route.description} icon={route.icon} path={route.path} />
               ) )}
            </div>
         </div>
         {/* <div className="flex flex-col justify-center p-3 gap-3">
            <div className="flex flex-col items-center justify-center gap-1">
               <Avatar isBordered className='dark' color="default" size='lg' src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
               <span >RALF RENZ BANTILO</span>
            </div>
            <Button color="success" onClick={handleSignout} className='font-semibold rounded-lg' variant="solid">
               SIGN OUT
            </Button>
         </div> */}
         <AuthButton />
      </aside>
   )
}

function AuthButton ()
{
   const { data: session } = useSession();

   if ( session )
   {
      console.log( session )
      return (
         <>
            <div className="flex flex-col justify-center p-3 gap-3">
               <div className="flex flex-col items-center justify-center gap-1">
                  <Avatar isBordered className='dark' color="default" size='lg' src={session.user?.image || ''} />
                  <span >{session?.user?.name}</span>
               </div>
               <Button color="success" onClick={() => signOut()} className='font-semibold rounded-lg' variant="solid">
                  SIGN OUT
               </Button>
            </div>
         </>
      );
   }
   return (
      <>
         <div className="flex flex-col justify-center p-3 gap-3">
            <span >Not signed in</span>
            <Button color="success" onClick={() => signIn()} className='font-semibold rounded-lg' variant="solid">
               SIGN IN
            </Button>
         </div>
      </>
   );
}


export default Sidebar
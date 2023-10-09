'use client'

import React, { ReactNode } from 'react'
import Sidebar from './Sidebar';
import ComponentContextProvider from './context/context';
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

const Content = ( { children }: { children: ReactNode } ) =>
{
   const router = useRouter()
   const { data: session } = useSession();

   // if ( !session )
   // {
   //    router.push( '/login' )
   // }

   return (
      <ComponentContextProvider>
         <main className='gradient-background min-h-screen flex'>
            <Sidebar />
            {/* main content */}
            <div className="flex h-screen w-full p-3 overflow-y-auto">
               {children}
            </div>
         </main>
      </ComponentContextProvider>
   )
}

export default Content
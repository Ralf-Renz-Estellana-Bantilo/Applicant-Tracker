'use client'

import React, { ReactNode } from 'react'
import Sidebar from './Sidebar';
import ComponentContextProvider from './context/context';

const Content = ( { children }: { children: ReactNode } ) =>
{

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
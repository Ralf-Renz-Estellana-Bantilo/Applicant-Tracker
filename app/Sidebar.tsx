'use client'

import React, { useContext } from 'react'
import SidebarButton from "./components/SidebarButton";
import { ComponentContext } from './context/context';
import { Avatar, Button } from '@nextui-org/react';

const Sidebar = () =>
{
   const context = useContext( ComponentContext )

   return (
      <aside className="flex flex-col justify-between min-h-screen border-r-1 border-border-color">
         <div className="flex flex-col">
            <div className="flex items-center justify-center w-64 border-b-1 border-border-color h-[12vh]">
               <h2 className="font-bold text-accent-primary">APPLICANT TRACKER</h2>
            </div>
            <div className="flex flex-col p-3 gap-1 w-64 h-full">
               {context?.routes.map( route => (
                  <SidebarButton key={route.ID} text={route.description} icon={route.icon} path={route.path} />
               ) )}
            </div>
         </div>
         <div className="flex flex-col justify-center p-3 gap-3">
            <div className="flex flex-col items-center justify-center gap-1">
               <Avatar isBordered className='dark' color="default" size='lg' src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
               <span >RALF RENZ BANTILO</span>
            </div>
            <Button color="success" className='font-semibold rounded-lg' variant="solid">
               LOGOUT
            </Button>
         </div>
      </aside>
   )
}

export default Sidebar
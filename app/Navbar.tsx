'use client'

import React from 'react'
import { Avatar, Button } from "@nextui-org/react";

const Navbar = () =>
{
   return (
      <nav className="flex items-center h-[12vh] border-b-1 border-border-color">
         <div className="flex items-center justify-center w-72 h-10 border-r-1 border-border-color">
            <h2 className="font-bold text-accent-primary">APPLICANT TRACKER</h2>
         </div>
         <div className="flex items-center justify-between flex-1 px-3">
            <div className="flex items-center gap-3">
               <Avatar isBordered color="default" src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
               <span >RALF RENZ BANTILO</span>
            </div>
            <Button color="primary" variant="solid">
               Logout
            </Button>
         </div>
      </nav>
   )
}

export default Navbar
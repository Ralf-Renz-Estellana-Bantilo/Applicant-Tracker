'use client'

import React from 'react'
import { SidebarButtonType } from '@/types/types'
import { useRouter, usePathname } from 'next/navigation'


const SidebarButton = ( { text, path, icon }: SidebarButtonType ) =>
{
   const router = useRouter()
   const pathname = usePathname()

   const changeRoute = () =>
   {
      router.push( path )
   }

   const isActiveRoute = path === '/' ? pathname === path : pathname.includes( path )

   return (
      <div className={`${isActiveRoute ? 'bg-green-300 text-success backdrop-filter backdrop-blur-sm bg-opacity-10' : 'hover:bg-green-300 hover:rounded-md hover:backdrop-filter hover:backdrop-blur-sm hover:bg-opacity-10 opacity-50'} flex items-center gap-4 p-2 font-medium rounded-md cursor-pointer  transition-colors ease`} onClick={changeRoute}>
         {icon}
         <span>{text}</span>
      </div>
   )
}

export default SidebarButton
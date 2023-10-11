
'use client'

import { BellIcon, FilterIcon, InfoIcon, SearchIcon, ShieldIcon, TrophyIcon, UserGroupIcon } from '@/icons/icons'
import { Button, Input } from '@nextui-org/react'
import { useSession } from 'next-auth/react'
import React, { useContext } from 'react'
import TwoLevelPieChart from '../components/charts/TwoLevelPieChart'
import TinyLineChart from '../components/charts/TinyLineChart'
import { ComponentContext } from '../context/context'

const DashboardPage = () =>
{
   const context = useContext( ComponentContext )
   const { data: session } = useSession();

   const getTotalApplicants = () =>
   {
      return context ? context.applicantList?.length : 0
   }

   return (
      <div className='flex flex-col w-full h-full gap-4'>
         <div className="flex items-center justify-between">
            <h3 className='font-semibold text-accent-primary'>WELCOME, <span className='text-success uppercase'>{session?.user?.name}</span></h3>
            <div className="flex items-center justify-end gap-2">
               <Input
                  isClearable
                  className="w-full sm:min-w-[44%]"
                  placeholder="Search here..."
                  startContent={<SearchIcon />}
               />
               <Button isIconOnly color="warning" variant="light" aria-label="Notification">
                  <BellIcon />
               </Button>
               <Button isIconOnly color="success" variant="light" aria-label="Notification">
                  <FilterIcon />
               </Button>
               <Button isIconOnly color="primary" variant="light" aria-label="Notification">
                  <InfoIcon />
               </Button>
            </div>
         </div>
         <div className="flex flex-col h-full gap-3">
            <div className="flex gap-3">
               <div className="flex flex-[2] gap-3">
                  <div className="flex flex-1 items-center justify-between h-32 border-1 border-border-color rounded-lg">
                     <div className="flex items-center justify-center w-24">
                        <UserGroupIcon />
                     </div>
                     <div className="flex flex-col justify-end px-10">
                        <span className='text-lg text-default-400 font-semibold'>Total Applicants</span>
                        <h2 className='text-2xl text-accent-secondary font-bold text-right'>{getTotalApplicants()}</h2>
                     </div>
                  </div>
                  <div className="flex flex-1 items-center justify-between h-32 border-1 border-border-color rounded-lg">
                     <div className="flex items-center justify-center w-24">
                        <TrophyIcon />
                     </div>
                     <div className="flex flex-col justify-end px-10">
                        <span className='text-lg text-default-400 font-semibold'>New Applicants</span>
                        <h2 className='text-2xl text-accent-secondary font-bold text-right'>11</h2>
                     </div>
                  </div>
               </div>
               <div className="flex flex-1 items-center justify-between h-32 border-1 border-border-color rounded-lg">
                  <div className="flex items-center justify-center w-24">
                     <ShieldIcon />
                  </div>
                  <div className="flex flex-col justify-end px-10">
                     <span className='text-lg text-default-400 font-semibold'>Onboarded </span>
                     <h2 className='text-2xl text-accent-secondary font-bold text-right'>11</h2>
                  </div>
               </div>
            </div>
            <div className="flex h-full gap-3">
               <div className="flex flex-[2] h-full text-success border-1 border-border-color rounded-lg">
                  <TinyLineChart />
               </div>
               <div className="flex flex-1 h-full border-1 border-border-color rounded-lg"><TwoLevelPieChart /></div>
            </div>
         </div>
      </div>
   )
}

export default DashboardPage
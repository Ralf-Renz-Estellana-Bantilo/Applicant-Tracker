'use client'

import { ScheduleTableCellType, StatusType } from '@/types/types';
import { statusColorMap } from '@/utils/utils';
import { Card, CardBody, Chip, Tab, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tabs } from '@nextui-org/react'
import React, { Key, useCallback, useContext, useEffect, useState } from 'react'
import { ComponentContext } from '../context/context';

type SchedOptionType = 'previous' | 'present' | 'future'
const SchedulePage = () =>
{

   const context = useContext( ComponentContext )
   const [schedules, setSchedules] = useState<{
      previous: ScheduleTableCellType[] | [];
      present: ScheduleTableCellType[] | [];
      future: ScheduleTableCellType[] | [];
   }>( {
      previous: [],
      present: [],
      future: [],
   } )

   let tabs = [
      {
         id: "previous",
         label: "Previous",
      },
      {
         id: "present",
         label: "Today",
      },
      {
         id: "future",
         label: "Upcoming",
      }
   ];

   const scheduleTableColumns = [
      {
         name: "INTERVIEWER",
         uid: 'interviewer'
      },
      {
         name: "APPOINTMENT",
         uid: 'appointment'
      },
      {
         name: "APPLICANT",
         uid: 'applicant'
      },
      {
         name: "ROLE",
         uid: 'role'
      },
      {
         name: "DATE",
         uid: 'date'
      },
      {
         name: "TIME",
         uid: 'time'
      },
      {
         name: "STATUS",
         uid: 'status'
      },
   ]

   const renderCell = useCallback( ( data: ScheduleTableCellType, columnKey: Key ) =>
   {
      const cellValue = data[columnKey as keyof ScheduleTableCellType];

      switch ( columnKey )
      {
         case "status":
            return (
               <Chip className="capitalize" color={statusColorMap[data.status]} size="sm" variant="flat">
                  {cellValue}
               </Chip>
            );

         default:
            return cellValue;
      }
   }, [] );

   useEffect( () =>
   {
      if ( context )
      {
         const { getScheduledAppointments } = context
         const scheduledAppointments = getScheduledAppointments()
         setSchedules( scheduledAppointments )
      }
   }, [context?.applicantList] )


   return (
      <div className="flex w-full flex-col h-full">
         <Tabs aria-label="Dynamic tabs" color='success' variant='bordered' className='dark' fullWidth items={tabs}>
            {( item ) => (
               <Tab key={item.id} title={
                  <div className="flex items-center space-x-2">
                     <span>{item.label}</span>
                     <Chip size="sm" variant="solid" color='danger' >{schedules[item.id as SchedOptionType].length}</Chip>
                  </div>
               }
                  className='w-full'>
                  <Card className='dark bg-transparent' shadow='none'>
                     <CardBody>
                        <Table
                           removeWrapper
                           shadow='none'
                           color='success'
                           selectionMode="single"
                           aria-label="Example static collection table"
                        >
                           <TableHeader columns={scheduleTableColumns}>
                              {( column ) => (
                                 <TableColumn
                                    key={column.uid}
                                    align={column.uid === "actions" ? "center" : "start"}
                                 >
                                    {column.name}
                                 </TableColumn>
                              )}
                           </TableHeader>
                           <TableBody emptyContent={"No appointments found"} items={schedules[item.id as SchedOptionType]} className="bg-blue-500">
                              {( item ) => (
                                 <TableRow key={item.id}>
                                    {( columnKey ) => <TableCell>{renderCell( item, columnKey )}</TableCell>}
                                 </TableRow>
                              )}
                           </TableBody>
                        </Table>
                     </CardBody>
                  </Card>
               </Tab>
            )}

         </Tabs>
      </div>
   );
}

export default SchedulePage
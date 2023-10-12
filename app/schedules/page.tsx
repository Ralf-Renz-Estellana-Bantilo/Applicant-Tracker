'use client'

import { ScheduleTableCellType } from '@/types/types';
import { formatDate, formatTime, statusColorMap } from '@/utils/utils';
import { Card, CardBody, Chip, Pagination, Tab, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tabs, User } from '@nextui-org/react'
import React, { Key, useCallback, useContext, useEffect, useMemo, useState } from 'react'
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

   const [activeTab, setActiveTab] = useState<SchedOptionType>( 'present' )

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
         name: "APPLICANT",
         uid: 'applicant'
      },
      {
         name: "APPOINTMENT",
         uid: 'appointment'
      },
      {
         name: "INTERVIEWER",
         uid: 'interviewer'
      },
      {
         name: "POSITION",
         uid: 'position'
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

   const [page, setPage] = useState( 1 );
   const rowsPerPage = 7;

   const pages = Math.ceil( schedules[activeTab].length / rowsPerPage );

   const items = useMemo( () =>
   {
      const start = ( page - 1 ) * rowsPerPage;
      const end = start + rowsPerPage;
      return schedules[activeTab].slice( start, end );
   }, [page, schedules, activeTab] );

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

         case "date":
            return (
               <p>{formatDate( data.date )}</p>
            )

         case "time":
            return (
               <p>{formatTime( data.timeStart )} - {formatTime( data.timeEnd )}</p>
            )

         case "applicant":
            return (
               <User
                  avatarProps={{ radius: "lg", name: data.applicant, src: data.avatar }}
                  description={data.email}
                  name={cellValue}
               ></User>
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
         <Tabs aria-label="Dynamic tabs" color='success' variant='bordered' className='dark' fullWidth items={tabs} selectedKey={activeTab}
            onSelectionChange={( e ) => setActiveTab( e as SchedOptionType )}
         >
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
                           isCompact
                           removeWrapper
                           shadow='none'
                           color='success'
                           selectionMode="single"
                           aria-label="Example static collection table"
                           bottomContent={
                              <div className="flex w-full justify-center">
                                 <Pagination
                                    isCompact
                                    showControls
                                    showShadow
                                    color="success"
                                    page={page}
                                    total={pages}
                                    onChange={( page ) => setPage( page )}
                                 />
                              </div>
                           }
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
                           <TableBody emptyContent={"No appointments found"} items={items} className="bg-blue-500">
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
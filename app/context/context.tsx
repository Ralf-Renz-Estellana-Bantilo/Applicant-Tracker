import { ApplicantIcons, DashboardIcon, ScheduleIcon } from "@/icons/icons";
import { ApplicantDataType, ApplicantStatusType, ContextValueType, RouteType, ScheduleTableCellType, StatusType, TableColumnType, TransactionType } from "@/types/types";
import React, { ReactNode, createContext, useState, useEffect } from "react";
import { columns, statusOptions, transactions, users } from "../data";

export const ComponentContext = createContext<ContextValueType | null>( null )

export default function ComponentContextProvider ( { children }: { children: ReactNode } )
{

   const [routes] = useState<RouteType[]>( [
      {
         id: Math.floor( Math.random() * 100 ),
         path: '/',
         description: 'Dashboard',
         icon: <DashboardIcon />
      },
      {
         id: Math.floor( Math.random() * 100 ),
         path: '/schedules',
         description: 'Schedules',
         icon: <ScheduleIcon />
      },
      {
         id: Math.floor( Math.random() * 100 ),
         path: '/applicants',
         description: 'Applicants',
         icon: <ApplicantIcons />
      },
   ] )
   const [tableColumns, setTableColumns] = useState<TableColumnType[]>( columns )
   const [applicantStatusOptions, setApplicantStatusOptions] = useState<ApplicantStatusType[]>( statusOptions )
   const [applicantList, setApplicantList] = useState<ApplicantDataType[]>( users )

   const [transactionList, setTransactionList] = useState<TransactionType[]>( transactions )

   const addNewApplicant = ( newApplicant: ApplicantDataType ) =>
   {
      setApplicantList( prevState => [...prevState, newApplicant] )
   }

   const deleteApplicant = ( applicantID: number ) =>
   {
      setApplicantList( prevState => prevState.filter( ( { id } ) => id != applicantID ) )
   }
   const updateApplicantList = ( newApplicant: ApplicantDataType, applicantID?: number ) =>
   {
      if ( !applicantID )
      {
         const newApplicantInfo = { ...newApplicant, id: Math.floor( Math.random() * 100000 ) }
         setApplicantList( prevState => [...prevState, newApplicantInfo] )
      } else
      {
         setApplicantList( prevState => prevState.map( state => state.id === applicantID
            ? newApplicant : state ) )
      }
   }

   const getTransactionPerApplicant = ( applicantID: number ): TransactionType[] | [] =>
   {
      const filterTransaction = transactionList.filter( transaction => transaction.applicantID === applicantID )

      return filterTransaction
   }

   const updateTransactionList = ( newTransaction: TransactionType, appointmentID?: number ) =>
   {
      if ( appointmentID )
      {
         setTransactionList( prevState => prevState.map( ( state ) =>
         {
            return state.id === appointmentID ? newTransaction : state
         } ) )
      } else
      {
         const newTransactionInfo = { ...newTransaction, id: Math.floor( Math.random() * 1000000 ) }
         setTransactionList( prevState => [...prevState, newTransactionInfo] )
      }
   }

   const updateApplicantStatus = ( applicantID: number, status: StatusType ) =>
   {
      setApplicantList( prevState => prevState.map( state => state.id === applicantID
         ? { ...state, status } : state ) )
   }

   const getScheduledAppointments = () =>
   {
      const result: {
         previous: ScheduleTableCellType[] | [],
         present: ScheduleTableCellType[] | [],
         future: ScheduleTableCellType[] | [],
      } = {
         previous: [],
         present: [],
         future: [],
      }

      transactionList.forEach( transaction =>
      {
         const appointmentYear = Number( `${transaction.date}`.split( "-" )[0] );
         const appointmentMonth = Number( `${transaction.date}`.split( "-" )[1] );
         const appointmentDay = Number( `${transaction.date}`.split( "-" )[2] );

         const currentMonth = new Date().getMonth() + 1;
         const currentDay = new Date().getDate();
         const currentYear = new Date().getFullYear();

         const applicantInfo = applicantList.find( ( { id } ) => id === transaction.applicantID )

         const appointment: ScheduleTableCellType = {
            id: transaction.id,
            interviewer: transaction.interviewer,
            appointment: transaction.appointment,
            applicantID: transaction.applicantID,
            applicant: applicantInfo?.name,
            role: applicantInfo?.role || '',
            date: transaction.date,
            time: `${transaction.timeStart} - ${transaction.timeEnd}`,
            status: transaction.status as StatusType,
         }


         if (
            currentYear === appointmentYear &&
            currentMonth === appointmentMonth &&
            currentDay === appointmentDay
         )
         {
            // PRESENT ----------------------------------------------------------------
            result.present.push( appointment as never )
         } else if (
            currentYear <= appointmentYear &&
            currentMonth <= appointmentMonth &&
            currentDay <= appointmentDay
         )
         {
            // FUTURE ----------------------------------------------------------------
            result.future.push( appointment as never )
         } else
         {
            // PAST ----------------------------------------------------------------
            result.previous.push( appointment as never )
         }

      } )

      return result
   }

   const value: ContextValueType = {
      routes,
      tableColumns,
      applicantStatusOptions,
      applicantList,
      setTableColumns,
      setApplicantStatusOptions,
      getTransactionPerApplicant,
      updateTransactionList,
      updateApplicantStatus,
      getScheduledAppointments,
      addNewApplicant,
      deleteApplicant,
      updateApplicantList
   }

   return (
      <ComponentContext.Provider value={value}>
         {children}
      </ComponentContext.Provider>
   )
}
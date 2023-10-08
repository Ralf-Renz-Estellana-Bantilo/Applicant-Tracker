import { ApplicantIcons, DashboardIcon, ScheduleIcon } from "@/icons/icons";
import { ApplicantDataType, ApplicantStatusType, ContextValueType, RouteType, TableColumnType, TransactionType } from "@/types/types";
import React, { ReactNode, createContext, useState } from "react";
import { columns, statusOptions, transactions, users } from "../data";

export const ComponentContext = createContext<ContextValueType | null>( null )

export default function ComponentContextProvider ( { children }: { children: ReactNode } )
{

   const [routes] = useState<RouteType[]>( [
      {
         ID: Math.floor( Math.random() * 100 ),
         path: '/',
         description: 'Dashboard',
         icon: <DashboardIcon />
      },
      {
         ID: Math.floor( Math.random() * 100 ),
         path: '/schedules',
         description: 'Schedules',
         icon: <ScheduleIcon />
      },
      {
         ID: Math.floor( Math.random() * 100 ),
         path: '/applicants',
         description: 'Applicants',
         icon: <ApplicantIcons />
      },
   ] )
   const [tableColumns, setTableColumns] = useState<TableColumnType[]>( columns )
   const [applicantStatusOptions, setApplicantStatusOptions] = useState<ApplicantStatusType[]>( statusOptions )
   const [applicantList, setApplicantList] = useState<ApplicantDataType[]>( users )

   const [transactionList, setTransactionList] = useState<TransactionType[]>( transactions )

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
         setTransactionList( prevState => [...prevState, newTransaction] )
      }
   }

   const updateApplicantStatus = ( applicantID: number, status: 'active' | 'unselected' | 'pending' ) =>
   {
      setApplicantList( prevState => prevState.map( state => state.id === applicantID
         ? { ...state, status } : state ) )
   }

   const value: ContextValueType = {
      routes,
      tableColumns,
      applicantStatusOptions,
      applicantList,
      setTableColumns,
      setApplicantStatusOptions,
      setApplicantList,
      getTransactionPerApplicant,
      updateTransactionList,
      updateApplicantStatus,
   }

   return (
      <ComponentContext.Provider value={value}>
         {children}
      </ComponentContext.Provider>
   )
}
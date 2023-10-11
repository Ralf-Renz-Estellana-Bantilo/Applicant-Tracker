import { ApplicantIcons, DashboardIcon, ScheduleIcon } from "@/icons/icons";
import { ApplicantDataType, ApplicantStatusType, ContextValueType, RouteType, ScheduleTableCellType, StatusType, TableColumnType, TransactionType } from "@/types/types";
import React, { ReactNode, createContext, useState, useEffect } from "react";
import { columns, statusOptions, transactionsList as transactionData, users } from "../data";
import { useSession } from "next-auth/react";
import { getSession, setSession } from "@/utils/utils";

export const ComponentContext = createContext<ContextValueType | null>( null )

export default function ComponentContextProvider ( { children }: { children: ReactNode } )
{

   const { data: session } = useSession();
   const [routes] = useState<RouteType[]>( [
      {
         id: Math.floor( Math.random() * 100 ),
         path: '/dashboard',
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

   const [transactionList, setTransactionList] = useState<TransactionType[]>( transactionData )

   const getApplicantListPerHR = ( list: ApplicantDataType[] ) =>
   {
      return session ? list.filter( ( { createdBy } ) => createdBy === 'admin' || createdBy === session.user?.email ) : []
   }

   const addNewApplicant = ( newApplicant: ApplicantDataType ) =>
   {
      const newApplicantInfo = [...applicantList, newApplicant]
      setSession( 'applicantListDB', JSON.stringify( newApplicantInfo ) )
      setApplicantList( newApplicantInfo )
   }

   const deleteApplicant = ( applicantID: number ) =>
   {
      const applicantListDBSession = getSession( 'applicantListDB' )
      if ( applicantListDBSession )
      {
         const parsedTransactionListDB: ApplicantDataType[] = JSON.parse( applicantListDBSession )
         const newApplicantInfo = parsedTransactionListDB.filter( ( { id } ) => id != applicantID )
         setApplicantList( newApplicantInfo )
         setSession( 'applicantListDB', JSON.stringify( newApplicantInfo ) )
      }
   }
   const updateApplicantList = ( newApplicant: ApplicantDataType, applicantID?: number ) =>
   {
      let newApplicantInfo: ApplicantDataType[] = []
      if ( !applicantID )
      {
         const applicantData = { ...newApplicant, id: Math.floor( Math.random() * 100000 ) }
         newApplicantInfo = [...applicantList, applicantData]
         setApplicantList( newApplicantInfo )
      } else
      {
         newApplicantInfo = applicantList.map( applicant =>
         {
            return applicant.id === applicantID
               ? newApplicant : applicant
         } )
         setApplicantList( newApplicantInfo )
      }
      setSession( 'applicantListDB', JSON.stringify( newApplicantInfo ) )
   }

   const getTransactionPerApplicant = ( applicantID: number ): TransactionType[] | [] =>
   {
      const transactionListDBSession = getSession( 'transactionListDB' )

      if ( transactionListDBSession )
      {
         const parsedTransactionListDB: TransactionType[] = JSON.parse( transactionListDBSession )
         const filterTransaction = parsedTransactionListDB.filter( transaction => transaction.applicantID === applicantID && ( transaction.createdBy === session?.user?.email || transaction.createdBy === 'admin' ) )
         return filterTransaction
      } else
      {
         console.log( transactionList )
         return transactionList.filter( transaction => transaction.applicantID === applicantID )
      }
   }

   const getTransactionListPerHR = ( list: TransactionType[] ) =>
   {
      return session ? list.filter( ( { createdBy } ) => createdBy === 'admin' || createdBy === session.user?.email ) : []
   }

   const updateTransactionList = ( newTransaction: TransactionType, appointmentID?: number ) =>
   {
      let transactionListDB: TransactionType[] = []
      if ( appointmentID )
      {
         transactionListDB = transactionList.map( transaction =>
         {
            return transaction.id === appointmentID ? newTransaction : transaction
         } )
      } else
      {
         const newTransactionInfo: TransactionType = {
            ...newTransaction,
            id: Math.floor( Math.random() * 1000000 ),
            createdBy: session?.user?.email || '',
         }
         transactionListDB = [...transactionList, newTransactionInfo]
      }

      setTransactionList( transactionListDB )
      setSession( 'transactionListDB', JSON.stringify( transactionListDB ) )
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

      const holdPreviousSchedules: ScheduleTableCellType[] | [] = []
      const holdPresentSchedules: ScheduleTableCellType[] | [] = []
      const holdFutureSchedules: ScheduleTableCellType[] | [] = []

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
            position: applicantInfo?.position || '',
            date: transaction.date,
            timeStart: transaction.timeStart || '',
            timeEnd: transaction.timeEnd || '',
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
            holdPresentSchedules.push( appointment as never )
         } else if (
            currentYear <= appointmentYear &&
            currentMonth <= appointmentMonth &&
            currentDay <= appointmentDay
         )
         {
            // FUTURE ----------------------------------------------------------------
            holdFutureSchedules.push( appointment as never )
         } else
         {
            // PAST ----------------------------------------------------------------
            holdPreviousSchedules.push( appointment as never )
         }
      } )

      result.previous = holdPreviousSchedules.filter( sched => sched.applicant ).sort(
         ( a, b ) =>
         {
            return a.date < b.date ? 1 : -1;
         }
      )
      result.present = holdPresentSchedules.filter( sched => sched.applicant ).sort(
         ( a, b ) =>
         {
            return a.date < b.date ? 1 : -1;
         }
      )
      result.future = holdFutureSchedules.filter( sched => sched.applicant ).sort(
         ( a, b ) =>
         {
            return a.date < b.date ? 1 : -1;
         }
      )

      return result
   }

   const initialize = () =>
   {
      const applicantListDBSession = getSession( 'applicantListDB' )
      const transactionListDBSession = getSession( 'transactionListDB' )

      if ( applicantListDBSession )
      {
         const parsedApplicantListDB = JSON.parse( applicantListDBSession )
         setApplicantList( getApplicantListPerHR( parsedApplicantListDB ) )
      } else
      {
         setSession( 'applicantListDB', JSON.stringify( applicantList ) )
         setApplicantList( prevState => getApplicantListPerHR( prevState ) )
      }

      if ( transactionListDBSession )
      {
         const parsedTransactionListDB = JSON.parse( transactionListDBSession )
         setTransactionList( getTransactionListPerHR( parsedTransactionListDB ) )
      } else
      {
         setSession( 'transactionListDB', JSON.stringify( transactionList ) )
         setTransactionList( prevState => getTransactionListPerHR( prevState ) )
      }
   }

   const value: ContextValueType = {
      routes,
      tableColumns,
      applicantStatusOptions,
      applicantList,
      initialize,
      setTableColumns,
      setApplicantStatusOptions,
      getTransactionPerApplicant,
      updateTransactionList,
      updateApplicantStatus,
      getScheduledAppointments,
      addNewApplicant,
      deleteApplicant,
      updateApplicantList,
   }

   return (
      <ComponentContext.Provider value={value}>
         {children}
      </ComponentContext.Provider>
   )
}
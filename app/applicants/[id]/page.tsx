'use client'

import React, { Key, useCallback, useContext, useEffect, useState, useMemo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Avatar, Button, Chip, ChipProps, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Selection, SortDescriptor, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip, useDisclosure } from '@nextui-org/react'
import { DeleteIcon, EditIcon, PlusIcon } from '@/icons/icons'
import { ApplicantDataType, StatusType } from '@/types/types'
import { ComponentContext } from '@/app/context/context'
import { transactionColumns, transactionStatusOptions, transactions } from '@/app/data'

const statusColorMap: Record<string, ChipProps["color"]> = {
   passed: "success",
   active: "success",
   failed: "danger",
   unselected: "danger",
   pending: "warning",
};
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { capitalize, formatDate, formatTime } from '@/utils/utils'

type TransactionType = typeof transactions[0] & { title?: string };

const INITIAL_VISIBLE_COLUMNS = ["appointment", "interviewer", "type", "mode"];
const INITIAL_FORMDATA: TransactionType = {
   id: 0,
   applicantID: 0,
   appointment: '',
   interviewer: '',
   date: '',
   timeStart: '',
   timeEnd: '',
   time: '--:-- - --:--',
   status: 'pending',
}


const page = () =>
{
   const { id } = useParams()
   const router = useRouter()
   const context = useContext( ComponentContext )
   const [applicant, setApplicant] = useState<ApplicantDataType | null>( null )

   const [filterValue, setFilterValue] = useState( "" );
   const [visibleColumns, setVisibleColumns] = useState<Selection>( new Set( INITIAL_VISIBLE_COLUMNS ) );
   const [statusFilter, setStatusFilter] = useState<Selection>( "all" );
   const [rowsPerPage, setRowsPerPage] = useState( 5 );
   const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>( {
      column: "age",
      direction: "ascending",
   } );

   const [page, setPage] = useState( 1 );
   const [formData, setFormData] = useState<TransactionType>( INITIAL_FORMDATA );
   const [transactions, setTransactions] = useState<TransactionType[] | []>( [] );
   const { isOpen, onOpen, onOpenChange } = useDisclosure();

   const hasSearchFilter = Boolean( filterValue );

   const back = () =>
   {
      router.push( '/applicants' )
   }

   const headerColumns = useMemo( () =>
   {
      if ( visibleColumns === "all" ) return transactionColumns || [];

      return transactionColumns.filter( ( column ) => Array.from( visibleColumns ).includes( column.uid ) || [] );
   }, [visibleColumns] );

   const filteredItems = useMemo( () =>
   {
      let filteredUsers = transactions ? [...transactions] : [];

      if ( hasSearchFilter )
      {
         filteredUsers = filteredUsers.filter( ( user ) =>
            user.appointment.toLowerCase().includes( filterValue.toLowerCase() ),
         );
      }
      if ( statusFilter !== "all" && Array.from( statusFilter ).length !== context?.applicantStatusOptions?.length )
      {
         filteredUsers = filteredUsers.filter( ( user ) =>
            Array.from( statusFilter ).includes( user.status ),
         );
      }

      return filteredUsers;
   }, [transactions, filterValue, statusFilter] );

   const items = useMemo( () =>
   {
      const start = ( page - 1 ) * rowsPerPage;
      const end = start + rowsPerPage;

      return filteredItems.slice( start, end );
   }, [page, filteredItems, rowsPerPage] );

   const sortedItems = useMemo( () =>
   {
      return [...items].sort( ( a: TransactionType, b: TransactionType ) =>
      {
         const first = a[sortDescriptor.column as keyof TransactionType] as number;
         const second = b[sortDescriptor.column as keyof TransactionType] as number;
         const cmp = first < second ? -1 : first > second ? 1 : 0;

         return sortDescriptor.direction === "descending" ? -cmp : cmp;
      } );
   }, [sortDescriptor, items] );

   const renderCell = useCallback( ( appointment: TransactionType, columnKey: Key ) =>
   {
      const cellValue = appointment[columnKey as keyof TransactionType];

      switch ( columnKey )
      {
         case "date":
            return <p>{formatDate( appointment.date )}</p>
         case "time":
            return <p>{formatTime( appointment.timeStart )} - {formatTime( appointment.timeEnd )}</p>
         case "status":
            return (
               <Chip className="capitalize" color={statusColorMap[appointment.status]} size="sm" variant="flat">
                  {cellValue}
               </Chip>
            );
         case "actions":
            return (
               <div className="relative flex items-center gap-2">
                  <Tooltip className="dark" color='success' content="Edit appointment">
                     <span className="text-lg text-success   cursor-pointer active:opacity-50" onClick={() => toggleAppointmentDialog( appointment, 'edit' )}>
                        <EditIcon />
                     </span>
                  </Tooltip>
                  <Tooltip className="dark" color="danger" content="Delete appointment">
                     <span className="text-lg text-danger cursor-pointer active:opacity-50">
                        <DeleteIcon />
                     </span>
                  </Tooltip>
               </div>
            );
         default:
            return cellValue;
      }
   }, [] );

   const handleChange = ( e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> ) =>
   {
      const { name, value } = e.target;
      setFormData( { ...formData, [name]: value } );
   }

   const saveAppointment = ( fn: () => void ) =>
   {
      const applicantID = Number( id )
      if ( context )
      {
         const { updateTransactionList, updateApplicantStatus } = context

         const values = Object.values( formData )
         if ( values.includes( '' ) )
         {
            return toast.warn( 'Fill-out all fields!', {
               position: "bottom-right",
               autoClose: 3000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
               theme: "dark",
            } );
         }

         let alertMessage = ''

         if ( formData.id === 0 )
         {
            formData.applicantID = applicantID
            formData.appointment = capitalize( formData.appointment )
            formData.interviewer = capitalize( formData.interviewer )
            formData.id = Math.floor( Math.random() * 1000 )
            formData.time = `${formData.timeStart} - ${formData.timeEnd}`

            updateTransactionList( formData )
            setTransactions( prevState => [...prevState, formData] )
            alertMessage = 'New appointment added!'
         } else
         {
            updateTransactionList( formData, formData.id )
            setTransactions( prevState => prevState.map( ( state ) =>
            {
               return state.id === formData.id ? formData : state
            } ) )
            alertMessage = 'Appointment has been updated!'
         }

         let status: StatusType = ( formData.status === 'failed' ? 'unselected' : 'active' ) as StatusType
         const newApplicantData = { ...applicant, status } as ApplicantDataType
         setApplicant( newApplicantData )
         updateApplicantStatus( applicantID, status )

         toast.success( alertMessage, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
         } );
         setFormData( INITIAL_FORMDATA )
         fn()
      }
   }

   const toggleAppointmentDialog = ( form: TransactionType, type: 'add' | 'edit' ) =>
   {
      onOpen()
      form.title = type === 'add' ? 'Add New Appointment' : 'Update Appointment'
      setFormData( form )
   }

   useEffect( () =>
   {
      if ( context )
      {
         const { applicantList, getTransactionPerApplicant } = context
         const applicantID = Number( id )
         const filterApplicant = applicantList?.find( ( app ) => app.id === applicantID )

         if ( !filterApplicant ) return back()

         const applicantTransaction = ( getTransactionPerApplicant( applicantID ) as TransactionType[] )
         setTransactions( applicantTransaction )

         if ( applicantTransaction.length > 0 )
         {
            const appointmentStatusList = applicantTransaction.map( applTrans => applTrans.status )
            const hasFailed = appointmentStatusList.includes( 'failed' )

            filterApplicant.status = hasFailed ? 'unselected' : 'active'
            setApplicant( filterApplicant )
         } else
         {
            filterApplicant.status = 'pending'
            setApplicant( filterApplicant )
         }
      }
   }, [] )


   return (
      <>
         <ToastContainer position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark" />
         <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="top-center"
            className="dark"
            backdrop="blur"
            isDismissable={false}
         >
            <ModalContent>
               {( onClose ) => (
                  <>
                     <ModalHeader className="flex flex-col gap-1">{formData?.title}</ModalHeader>
                     <ModalBody className="flex flex-col">
                        <div className="flex gap-2">
                           <div className="flex flex-1">
                              <Input
                                 autoFocus
                                 label="Appointment Description:"
                                 value={formData.appointment}
                                 onChange={handleChange}
                                 name="appointment"
                                 isRequired
                                 placeholder="Enter appointment description"
                                 variant="bordered"
                              />
                           </div>
                        </div>
                        <div className="flex gap-2">
                           <div className="flex flex-1">
                              <Input
                                 label="Interviewer/Evaluator:"
                                 value={formData.interviewer}
                                 onChange={handleChange}
                                 name="interviewer"
                                 isRequired
                                 placeholder="Enter interviewer/evaluator"
                                 variant="bordered"
                              />
                           </div>
                        </div>
                        <div className="flex gap-2">
                           <div className="flex flex-1">

                              <Input
                                 label="Date:"
                                 value={formData.date}
                                 onChange={handleChange}
                                 name="date"
                                 isRequired
                                 type='date'
                                 placeholder="Enter date"
                                 variant="bordered"
                              />
                           </div>
                        </div>
                        <div className="flex gap-2">
                           <div className="flex flex-1">
                              <Input
                                 label="Time Start:"
                                 value={formData.timeStart}
                                 onChange={handleChange}
                                 name="timeStart"
                                 isRequired
                                 type='time'
                                 placeholder="Enter time start"
                                 variant="bordered"
                              />

                           </div>
                           <div className="flex flex-1">
                              <Input
                                 label="Time End:"
                                 value={formData.timeEnd}
                                 onChange={handleChange}
                                 name="timeEnd"
                                 type='time'
                                 isRequired
                                 placeholder="Enter time end"
                                 variant="bordered"
                              />
                           </div>
                        </div>
                        {formData.id != 0 && <div className="flex gap-2">
                           <div className="flex flex-1">
                              <Select
                                 label="Select status"
                                 selectedKeys={[formData.status]}
                                 name='status'
                                 onChange={handleChange}
                                 variant='bordered'
                              >
                                 {transactionStatusOptions.map( option => (
                                    <SelectItem key={option.uid} textValue={option.name} value={option.uid}>
                                       {option.name}
                                    </SelectItem>
                                 ) )}
                              </Select>
                           </div>
                        </div>}

                     </ModalBody>
                     <ModalFooter>
                        <Button color="success" variant="flat" onPress={onClose}>
                           Close
                        </Button>
                        <Button color="success" onClick={() => saveAppointment( onClose )}>
                           Save
                        </Button>
                     </ModalFooter>
                  </>
               )}
            </ModalContent>
         </Modal>
         <div className="flex min-h-full gap-3 w-full">
            <aside className='flex flex-col justify-between min-w-[300px] border-1 border-border-color rounded-lg'>
               <div className="flex flex-col gap-2 ">
                  <div className="flex items-center justify-start">
                     <Button color="success" className='rounded-lg' variant="light" onClick={back}>
                        Back
                     </Button>
                  </div>
                  <div className="flex flex-col gap-5">
                     <div className="flex flex-col justify-center items-center gap-1">
                        <Avatar src={applicant?.avatar} className="w-40 h-40 text-large" />
                        <div className="flex flex-col justify-center items-center">
                           <h3 className='font-semibold text-accent-primary text-lg'>{`${applicant?.name}`}</h3>
                           <span className='text-accent-secondary'>{applicant?.position}</span>
                        </div>
                     </div>
                     <div className="flex flex-col h-full gap-2 p-2 rounded-lg">
                        <div className="flex justify-between items-center">
                           <span className='text-default-400 text-sm'>Date Applied:</span>
                           <h3 className='text-sm text-default-500 font-semibold'>{formatDate( applicant?.dateApplied || '' )}</h3>
                        </div>
                        <div className="flex justify-between items-center">
                           <span className='text-default-400 text-sm'>Contact No.:</span>
                           <h3 className='text-sm text-default-500 font-semibold'>{applicant?.contactNo}</h3>
                        </div>
                        <div className="flex justify-between items-center">
                           <span className='text-default-400 text-sm'>Email:</span>
                           <h3 className='text-sm text-default-500 font-semibold'>{applicant?.email}</h3>
                        </div>
                        <div className="flex justify-between items-center">
                           <span className='text-default-400 text-sm'>Team:</span>
                           <h3 className='text-sm text-default-500 font-semibold'>{applicant?.team}</h3>
                        </div>
                        <div className="flex justify-between items-center">
                           <span className='text-default-400 text-sm'>Status:</span>
                           <h3 className='text-sm text-default-500 font-semibold'>
                              <Chip className="capitalize" color={statusColorMap[applicant?.status || 'active']} size="sm" variant="flat">
                                 {applicant?.status}
                              </Chip>
                           </h3>
                        </div>
                     </div>
                  </div>
               </div>
            </aside>
            <div className="flex flex-col justify-between flex-1 rounded-lg">
               <div className="flex flex-col">
                  <div className="flex justify-center items-center p-2">
                     <h3 className='text-accent-primary font-semibold'>Appointment List</h3>
                  </div>
                  <Table
                     removeWrapper
                     aria-label="Example table with custom cells, pagination and sorting"
                     isHeaderSticky
                     className="dark"
                     classNames={{
                        wrapper: "max-h-[425px]",
                     }}
                  >
                     <TableHeader columns={headerColumns}>
                        {( column ) => (
                           <TableColumn
                              key={column.uid}
                              align={column.uid === "actions" ? "center" : "start"}
                           >
                              {column.name}
                           </TableColumn>
                        )}
                     </TableHeader>
                     <TableBody emptyContent={"No appointments found"} items={sortedItems} className="bg-blue-500">
                        {( item ) => (
                           <TableRow key={item.appointment}>
                              {( columnKey ) => <TableCell>{renderCell( item, columnKey )}</TableCell>}
                           </TableRow>
                        )}
                     </TableBody>
                  </Table>

               </div>
               <Button color="success" variant='light' className='rounded-lg' onClick={() => toggleAppointmentDialog( INITIAL_FORMDATA, 'add' )} endContent={<PlusIcon />}>
                  Add New Appointment
               </Button>
            </div>
         </div>
      </>
   )
}

export default page
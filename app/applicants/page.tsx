'use client'

import React, { useCallback, useMemo, useState, Key, ChangeEvent, useContext, useEffect } from "react";
import
{
   Table,
   TableHeader,
   TableColumn,
   TableBody,
   TableRow,
   TableCell,
   Input,
   Button,
   DropdownTrigger,
   Dropdown,
   DropdownMenu,
   DropdownItem,
   Chip,
   User,
   Pagination,
   Selection,
   ChipProps,
   SortDescriptor,
   Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Checkbox, Link, Tooltip
} from "@nextui-org/react";
import { } from "../data";
import { ChevronDownIcon, DeleteIcon, EditIcon, EyeIcon, PlusIcon, SearchIcon, VerticalDotsIcon } from "@/icons/icons";
import { capitalize, formatDate, getSession, setSession, statusColorMap } from "@/utils/utils";
import { ComponentContext } from "../context/context";
import { ApplicantDataType } from "@/types/types";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";

type TransactionType = ApplicantDataType & { title?: string };

const INITIAL_VISIBLE_COLUMNS = ["name", "contactNo", "status", "actions"];

const INITIAL_FORMDATA: TransactionType = {
   id: 0,
   avatar: 'https://images.unsplash.com/broken',
   name: '',
   contactNo: '',
   email: '',
   position: '',
   team: '',
   dateApplied: '',
   status: 'pending',
}

const ApplicantPage = () =>
{
   const { isOpen, onOpen, onOpenChange } = useDisclosure();
   const context = useContext( ComponentContext )
   const router = useRouter()

   const [filterValue, setFilterValue] = useState( "" );
   const [selectedKeys, setSelectedKeys] = useState<Selection>( new Set( [] ) );
   const [visibleColumns, setVisibleColumns] = useState<Selection>( new Set( INITIAL_VISIBLE_COLUMNS ) );
   const [statusFilter, setStatusFilter] = useState<Selection>( "all" );
   const [rowsPerPage, setRowsPerPage] = useState( 5 );
   const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>( {
      column: "age",
      direction: "ascending",
   } );

   const [page, setPage] = useState( 1 );

   const hasSearchFilter = Boolean( filterValue );

   const viewApplicant = ( applicantID: number ) =>
   {
      router.push( `/applicants/${applicantID}` )
   }

   const deleteApplicant = ( applicantID: number ) =>
   {
      if ( context )
      {
         const { deleteApplicant } = context
         deleteApplicant( applicantID )
      }
   }

   const headerColumns = useMemo( () =>
   {
      if ( visibleColumns === "all" ) return context?.tableColumns || [];

      return context?.tableColumns?.filter( ( column ) => Array.from( visibleColumns ).includes( column.uid ) || [] );
   }, [visibleColumns] );

   const filteredItems = useMemo( () =>
   {
      let filteredUsers = context?.applicantList ? [...context?.applicantList] : [];

      if ( hasSearchFilter )
      {
         filteredUsers = filteredUsers.filter( ( user ) =>
            user.name.toLowerCase().includes( filterValue.toLowerCase() ),
         );
      }
      if ( statusFilter !== "all" && Array.from( statusFilter ).length !== context?.applicantStatusOptions?.length )
      {
         filteredUsers = filteredUsers.filter( ( user ) =>
            Array.from( statusFilter ).includes( user.status ),
         );
      }

      return filteredUsers;
   }, [context?.applicantList, filterValue, statusFilter] );

   const pages = Math.ceil( filteredItems.length / rowsPerPage );

   const items = useMemo( () =>
   {
      const start = ( page - 1 ) * rowsPerPage;
      const end = start + rowsPerPage;

      return filteredItems.slice( start, end );
   }, [page, filteredItems, rowsPerPage] );

   const sortedItems = useMemo( () =>
   {
      return [...items].sort( ( a: ApplicantDataType, b: ApplicantDataType ) =>
      {
         const first = a[sortDescriptor.column as keyof ApplicantDataType] as number;
         const second = b[sortDescriptor.column as keyof ApplicantDataType] as number;
         const cmp = first < second ? -1 : first > second ? 1 : 0;

         return sortDescriptor.direction === "descending" ? -cmp : cmp;
      } );
   }, [sortDescriptor, items] );

   const renderCell = useCallback( ( user: ApplicantDataType, columnKey: Key ) =>
   {
      const cellValue = user[columnKey as keyof ApplicantDataType];

      switch ( columnKey )
      {
         case "name":
            return (
               <User
                  avatarProps={{ radius: "lg", src: user.avatar }}
                  description={user.email}
                  name={cellValue}
               >
                  {user.email}
               </User>
            );
         case "dateApplied":
            return (
               <p>{formatDate( user.dateApplied )}</p>
            )
         case "status":
            return (
               <Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
                  {cellValue}
               </Chip>
            );
         case "actions":
            return (
               <div className="relative flex items-center gap-2">
                  <Tooltip className="dark" color="primary" content="Details">
                     <span className="text-lg text-primary cursor-pointer active:opacity-50" onClick={() => viewApplicant( user.id )}>
                        <EyeIcon />
                     </span>
                  </Tooltip>
                  <Tooltip className="dark" color="success" content="Edit user">
                     <span className="text-lg text-success cursor-pointer active:opacity-50" onClick={() => toggleApplicantCreationDialog( user, 'edit' )}>
                        <EditIcon />
                     </span>
                  </Tooltip>
                  <Tooltip className="dark" color="danger" content="Delete user">
                     <span className="text-lg text-danger cursor-pointer active:opacity-50" onClick={() => deleteApplicant( user.id )}>
                        <DeleteIcon />
                     </span>
                  </Tooltip>
               </div>
            );
         default:
            return cellValue;
      }
   }, [] );

   const onNextPage = useCallback( () =>
   {
      if ( page < pages )
      {
         const nextPage = pages + 1
         setPage( nextPage );
         setSession( 'page', nextPage )
      }
   }, [page, pages] );

   const onPreviousPage = useCallback( () =>
   {
      if ( page > 1 )
      {
         const prevPage = pages - 1
         setPage( prevPage );
         setSession( 'page', prevPage )
      }
   }, [page] );

   const onRowsPerPageChange = useCallback( ( e: ChangeEvent<HTMLSelectElement> ) =>
   {
      setRowsPerPage( Number( e.target.value ) );
      setPage( 1 );
      setSession( 'page', 1 )
   }, [] );

   const onSearchChange = useCallback( ( value?: string ) =>
   {
      if ( value )
      {
         setFilterValue( value );
         setPage( 1 );
         setSession( 'page', 1 )
      } else
      {
         setFilterValue( "" );
      }
   }, [] );

   const onClear = useCallback( () =>
   {
      setFilterValue( "" )
      setPage( 1 )
      setSession( 'page', 1 )
   }, [] )

   const changePage = ( e: number ) =>
   {
      setPage( e )
      setSession( 'page', e )
   }

   const topContent = useMemo( () =>
   {
      return (
         <div className="flex flex-col gap-4">
            <div className="flex justify-between gap-3 items-end">
               <Input
                  isClearable
                  className="w-full sm:max-w-[44%]"
                  placeholder="Search by name..."
                  startContent={<SearchIcon />}
                  value={filterValue}
                  onClear={() => onClear()}
                  onValueChange={onSearchChange}
               />
               <div className="flex gap-3">
                  <Dropdown className="dark">
                     <DropdownTrigger className="hidden sm:flex">
                        <Button endContent={<ChevronDownIcon />} variant="flat">
                           Status
                        </Button>
                     </DropdownTrigger>
                     <DropdownMenu
                        disallowEmptySelection
                        aria-label="Table Columns"
                        closeOnSelect={false}
                        selectedKeys={statusFilter}
                        selectionMode="multiple"
                        onSelectionChange={setStatusFilter}
                     >
                        {context?.applicantStatusOptions?.map( ( status ) => (
                           <DropdownItem key={status.uid} className="capitalize">
                              {capitalize( status.name )}
                           </DropdownItem>
                        ) ) || []}
                     </DropdownMenu>
                  </Dropdown>
                  <Dropdown className="dark">
                     <DropdownTrigger className="hidden sm:flex">
                        <Button endContent={<ChevronDownIcon />} variant="flat">
                           Columns
                        </Button>
                     </DropdownTrigger>
                     <DropdownMenu
                        disallowEmptySelection

                        aria-label="Table Columns"
                        closeOnSelect={false}
                        selectedKeys={visibleColumns}
                        selectionMode="multiple"
                        onSelectionChange={setVisibleColumns}
                     >
                        {context?.tableColumns?.map( ( column ) => (
                           <DropdownItem key={column.uid} className="capitalize">
                              {capitalize( column.name )}
                           </DropdownItem>
                        ) ) || []}
                     </DropdownMenu>
                  </Dropdown>
                  <Button color="success" onPress={() => toggleApplicantCreationDialog( formData, 'add' )} endContent={<PlusIcon />}>
                     Add New
                  </Button>
               </div>
            </div>
            <div className="flex justify-end items-center">
               <label className="flex items-center text-accent-secondary text-small">
                  Rows per page:
                  <select
                     className="outline-none text-accent-secondary text-small"
                     onChange={onRowsPerPageChange}
                  >
                     <option value="5">5</option>
                     <option value="10">10</option>
                     <option value="15">15</option>
                  </select>
               </label>
            </div>
         </div>
      );
   }, [
      filterValue,
      statusFilter,
      visibleColumns,
      onSearchChange,
      onRowsPerPageChange,
      context?.applicantList?.length,
      hasSearchFilter,
   ] );

   const bottomContent = useMemo( () =>
   {
      return (
         <div className="py-2 px-2 flex justify-between items-center">
            <span className="w-[30%] text-accent-secondary text-small">Total Applicants: {context?.applicantList?.length} </span>
            <Pagination
               isCompact
               showControls
               showShadow
               color="success"
               page={page}
               total={pages}
               onChange={changePage}
            />
            <div className="hidden sm:flex w-[30%] justify-end gap-2">
               <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
                  Previous
               </Button>
               <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
                  Next
               </Button>
            </div>
         </div>
      );
   }, [selectedKeys, items.length, page, pages, hasSearchFilter] );

   const [formData, setFormData] = useState<TransactionType>( INITIAL_FORMDATA );

   const handleChange = ( e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) =>
   {
      const { name, value } = e.target;
      setFormData( { ...formData, [name]: value } );
   }

   const handleSave = () =>
   {
      if ( context )
      {
         const { addNewApplicant, updateApplicantList } = context
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

         const isNewApplicant = formData.id === INITIAL_FORMDATA.id
         let alert = ''

         if ( isNewApplicant )
         {
            addNewApplicant( formData )
            console.log( {
               formData,
               applicants: context.applicantList
            } )
            alert = 'New applicant added!'
         } else
         {
            updateApplicantList( formData, formData.id )
            alert = 'Applicant has been updated!'
         }

         console.log( formData )

         setFormData( INITIAL_FORMDATA )

         toast.success( alert, {
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
   }

   const toggleApplicantCreationDialog = ( form: TransactionType, type: 'add' | 'edit' ) =>
   {
      onOpen()
      const title = type === 'add' ? 'Add New Appointment' : 'Update Appointment'
      const formInfo = { ...form, title }
      setFormData( formInfo )
   }

   useEffect( () =>
   {
      const pageNumber = Number( getSession( 'page' ) ) || 1
      setPage( pageNumber )
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
                     <ModalHeader className="flex flex-col gap-1">{formData.title}</ModalHeader>
                     <ModalBody className="flex flex-col">
                        <div className="flex gap-2">
                           <div className="flex flex-1">
                              <Input
                                 label="Full Name:"
                                 autoFocus
                                 name="name"
                                 isRequired
                                 value={formData.name}
                                 onChange={handleChange}
                                 placeholder="Enter fullname"
                                 variant="bordered"
                              />
                           </div>
                        </div>
                        <div className="flex">
                           <div className="flex flex-1">
                              <Input
                                 label="Email Address:"
                                 name="email"
                                 isRequired
                                 value={formData.email}
                                 onChange={handleChange}
                                 placeholder="Enter email address"
                                 variant="bordered"
                              />
                           </div>
                        </div>
                        <div className="flex gap-2">

                           <div className="flex flex-1">
                              <Input
                                 label="Contact Number:"
                                 name="contactNo"
                                 isRequired
                                 value={formData.contactNo}
                                 onChange={handleChange}
                                 placeholder="Enter contact number"
                                 variant="bordered"
                              />
                           </div>
                           <div className="flex flex-1">
                              <Input
                                 label="Date Applied:"
                                 name="dateApplied"
                                 type="date"
                                 isRequired
                                 value={formData.dateApplied}
                                 onChange={handleChange}
                                 placeholder="Enter date"
                                 variant="bordered"
                              />
                           </div>
                        </div>
                        <div className="flex gap-2">
                           <div className="flex flex-1">
                              <Input
                                 label="Role:"
                                 name="role"
                                 isRequired
                                 value={formData.position}
                                 onChange={handleChange}
                                 placeholder="Enter applied role"
                                 variant="bordered"
                              />
                           </div>
                        </div>
                        <div className="flex">
                           <div className="flex flex-1">
                              <Input
                                 label="Team:"
                                 name="team"
                                 isRequired
                                 value={formData.team}
                                 onChange={handleChange}
                                 placeholder="Enter assigned team"
                                 variant="bordered"
                              />
                           </div>
                        </div>
                     </ModalBody>
                     <ModalFooter>
                        <Button color="success" variant="flat" onPress={onClose}>
                           Close
                        </Button>
                        <Button color="success" onClick={handleSave} onPress={onClose}>
                           Save
                        </Button>
                     </ModalFooter>
                  </>
               )}
            </ModalContent>
         </Modal>
         <Table
            removeWrapper
            aria-label="Example table with custom cells, pagination and sorting"
            isHeaderSticky
            className="dark"
            bottomContent={bottomContent}
            bottomContentPlacement="outside"
            classNames={{
               wrapper: "max-h-[425px]",
            }}
            sortDescriptor={sortDescriptor}
            topContent={topContent}
            topContentPlacement="outside"
            onSelectionChange={setSelectedKeys}
            onSortChange={setSortDescriptor}
         >
            <TableHeader columns={headerColumns}>
               {( column ) => (
                  <TableColumn
                     key={column.uid}
                     align={column.uid === "actions" ? "center" : "start"}
                     allowsSorting={column.sortable}
                  >
                     {column.name}
                  </TableColumn>
               )}
            </TableHeader>
            <TableBody emptyContent={"No applicants found"} items={sortedItems} className="bg-blue-500">
               {( item ) => (
                  <TableRow key={item.id}>
                     {( columnKey ) => <TableCell>{renderCell( item, columnKey )}</TableCell>}
                  </TableRow>
               )}
            </TableBody>
         </Table>
      </>
   );

}

export default ApplicantPage
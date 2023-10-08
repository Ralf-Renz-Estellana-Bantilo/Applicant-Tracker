'use client'

import React, { useCallback, useMemo, useState, Key, ChangeEvent, useContext } from "react";
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
import { capitalize } from "@/utils/utils";
import { ComponentContext } from "../context/context";
import { ApplicantDataType } from "@/types/types";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";

const statusColorMap: Record<string, ChipProps["color"]> = {
   active: "success",
   unselected: "danger",
   pending: "warning",
};

const INITIAL_VISIBLE_COLUMNS = ["name", "contactNo", "status", "actions"];

const INITIAL_FORMDATA = {
   id: 0,
   avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
   name: '',
   contactNo: '',
   email: '',
   role: '',
   team: '',
   dateApplied: '',
   status: 'active',
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

   const editApplicant = ( applicantID: number ) =>
   {
      console.log( applicantID )
   }

   const deleteApplicant = ( applicantID: number ) =>
   {
      if ( context )
      {
         const { setApplicantList } = context
         setApplicantList( prevState => prevState.filter( ( { id } ) => id != applicantID ) )
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
         case "role":
            return (
               <div className="flex flex-col">
                  <p className="text-bold text-small capitalize">{cellValue}</p>
                  <p className="text-bold text-tiny capitalize text-default-400">{user.team}</p>
               </div>
            );
         case "status":
            return (
               <Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
                  {cellValue}
               </Chip>
            );
         case "actions":
            return (
               <div className="relative flex items-center gap-2">
                  <Tooltip className="dark" content="Details">
                     <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => viewApplicant( user.id )}>
                        <EyeIcon />
                     </span>
                  </Tooltip>
                  <Tooltip className="dark" content="Edit user">
                     <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => editApplicant( user.id )}>
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
         setPage( page + 1 );
      }
   }, [page, pages] );

   const onPreviousPage = useCallback( () =>
   {
      if ( page > 1 )
      {
         setPage( page - 1 );
      }
   }, [page] );

   const onRowsPerPageChange = useCallback( ( e: ChangeEvent<HTMLSelectElement> ) =>
   {
      setRowsPerPage( Number( e.target.value ) );
      setPage( 1 );
   }, [] );

   const onSearchChange = useCallback( ( value?: string ) =>
   {
      if ( value )
      {
         setFilterValue( value );
         setPage( 1 );
      } else
      {
         setFilterValue( "" );
      }
   }, [] );

   const onClear = useCallback( () =>
   {
      setFilterValue( "" )
      setPage( 1 )
   }, [] )

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
                  <Button color="success" onPress={onOpen} endContent={<PlusIcon />}>
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
               onChange={setPage}
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

   const [formData, setFormData] = useState<ApplicantDataType>( INITIAL_FORMDATA );

   const handleChange = ( e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) =>
   {
      const { name, value } = e.target;
      setFormData( { ...formData, [name]: value } );
   }

   const handleAddNewApplicant = () =>
   {
      if ( context )
      {
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
         formData.id = Math.floor( Math.random() * 100 )
         const { setApplicantList } = context
         setApplicantList( prevState => [...prevState, formData] )
         setFormData( INITIAL_FORMDATA )

         toast.success( 'New applicant added!', {
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
                     <ModalHeader className="flex flex-col gap-1">Add New Applicant</ModalHeader>
                     <ModalBody className="flex flex-col">
                        <div className="flex gap-2">
                           <div className="flex flex-1">
                              <Input
                                 autoFocus
                                 label="Full Name:"
                                 name="name"
                                 isRequired
                                 value={formData.name}
                                 onChange={handleChange}
                                 placeholder="Enter fullname"
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
                                 label="Role:"
                                 name="role"
                                 isRequired
                                 value={formData.role}
                                 onChange={handleChange}
                                 placeholder="Enter applied role"
                                 variant="bordered"
                              />

                           </div>
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
                        <Button color="success" onClick={handleAddNewApplicant} onPress={onClose}>
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
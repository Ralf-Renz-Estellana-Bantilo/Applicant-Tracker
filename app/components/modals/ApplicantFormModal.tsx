import { ComponentContext } from '@/app/context/context';
import { ApplicantFormDataType } from '@/types/types';
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import React, { Dispatch, memo, useCallback, useContext, useRef, useState } from 'react'
import { ToastContainer, toast } from "react-toastify";

const INITIAL_FORMDATA: ApplicantFormDataType = {
   id: 0,
   avatar: 'https://images.unsplash.com/broken',
   name: '',
   contactNo: '',
   email: '',
   position: '',
   team: '',
   dateApplied: '',
   status: 'pending',
   title: 'Add New Appointment',
}

type ApplicantFormModalProp = {
   formData: ApplicantFormDataType,
   setFormData: Dispatch<React.SetStateAction<ApplicantFormDataType>>,
   isOpen: boolean,
   onOpenChange: () => void
}

const ApplicantFormModal = ( { isOpen, onOpenChange, formData, setFormData }: ApplicantFormModalProp ) =>
{
   const context = useContext( ComponentContext )

   const handleChange = useCallback( ( e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) =>
   {
      const { name, value } = e.target;
      setFormData( { ...formData, [name]: value } );
   }, [formData] )

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

   return (
      <>
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
                                 label="Position:"
                                 name="position"
                                 isRequired
                                 value={formData.position}
                                 onChange={handleChange}
                                 placeholder="Enter applied position"
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
      </>
   )
}

export default memo( ApplicantFormModal )
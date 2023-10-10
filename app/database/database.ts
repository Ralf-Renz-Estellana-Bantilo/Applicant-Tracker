// FAKE DATABASE ---------------------------------------------------

import { ApplicantTableSchemaType, ApplicationStatusTableSchemaType, AppointmentTableSchemaType, AppoitmentStatusTableSchemaType } from "@/types/types"

export const applicants_table: ApplicantTableSchemaType[] = [
   {
      id: 1,
      name: '',
      contactNo: '',
      email: '',
      position: '',
      team: '',
      dateApplied: '',
      applicationStatusID: 1,
      createdBy: '',
      status: 1,
   }
]

export const appointments_table: AppointmentTableSchemaType[] = [
   {
      id: 1,
      applicantID: "",
      appointment: "",
      interviewer: "",
      date: "",
      timeStart: "",
      timeEnd: "",
      appointmentStatusID: 1,
      status: 1,
   }
]

export const application_status_table: ApplicationStatusTableSchemaType[] = [
   {
      id: 1,
      code: 'active',
      description: 'Active',
   },
   {
      id: 2,
      code: 'unselected',
      description: 'Not Selected',
   },
   {
      id: 3,
      code: 'pending',
      description: 'Pending',
   },
]

export const appointment_status_table: AppoitmentStatusTableSchemaType[] = [
   {
      id: 1,
      code: 'passed',
      description: 'Passed',
   },
   {
      id: 2,
      code: 'failed',
      description: 'Failed',
   },
   {
      id: 3,
      code: 'pending',
      description: 'Pending',
   },
]
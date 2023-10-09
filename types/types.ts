import { Dispatch, ReactNode, SetStateAction } from "react"

export type SidebarButtonType = {
   text: string,
   icon: ReactNode,
   path: string,
}

export type StatusType = 'active' | 'pending' | 'unselected'

export type RouteType = {
   id: number;
   path: string;
   description: string
   icon: ReactNode,
}

export type ContextValueType = {
   routes: RouteType[],
   tableColumns: TableColumnType[] | null
   applicantStatusOptions: ApplicantStatusType[] | null
   applicantList: ApplicantDataType[] | null
   addNewApplicant: ( newApplicant: ApplicantDataType ) => void
   deleteApplicant: ( applicantID: number ) => void
   setTableColumns: Dispatch<SetStateAction<TableColumnType[]>>
   setApplicantStatusOptions: Dispatch<SetStateAction<ApplicantStatusType[]>>
   getTransactionPerApplicant: ( params: number ) => TransactionType[] | []
   updateTransactionList: ( params: TransactionType, appointmentID?: number ) => void
   updateApplicantStatus: ( applicantID: number, status: StatusType ) => void
   getScheduledAppointments: () => {
      previous: ScheduleTableCellType[] | [];
      present: ScheduleTableCellType[] | [];
      future: ScheduleTableCellType[] | [];
   },
   updateApplicantList: ( newApplicant: ApplicantDataType, applicantID?: number ) => void
}

export type ApplicantDataType = {
   id: number;
   name: string;
   role: string;
   team: string;
   dateApplied: string;
   status: string;
   contactNo: string;
   avatar: string;
   email: string;
}

export type TableColumnType = {
   name: string;
   uid: string;
   sortable?: boolean;
}

export type ApplicantStatusType = {
   name: string;
   uid: string;
}

export type TransactionType = {
   id: number;
   applicantID: number;
   appointment: string;
   interviewer: string;
   date: string;
   timeStart?: string;
   timeEnd?: string;
   time: string;
   status: string
   title?: string
}

export type ScheduleTableCellType = {
   id: number;
   interviewer: string;
   appointment: string;
   applicant?: string;
   applicantID: number;
   role: string;
   date: string;
   time: string;
   status: StatusType
}
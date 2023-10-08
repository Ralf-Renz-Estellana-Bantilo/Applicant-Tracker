import { Dispatch, ReactNode, SetStateAction } from "react"

export type SidebarButtonType = {
   text: string,
   icon: ReactNode,
   path: string,
}

export type ThemeType = 'dark' | 'light'

export type RouteType = {
   ID: number;
   path: string;
   description: string
   icon: ReactNode,
}

export type ContextValueType = {
   routes: RouteType[],
   tableColumns: TableColumnType[] | null
   applicantStatusOptions: ApplicantStatusType[] | null
   applicantList: ApplicantDataType[] | null
   setTableColumns: Dispatch<SetStateAction<TableColumnType[]>>
   setApplicantStatusOptions: Dispatch<SetStateAction<ApplicantStatusType[]>>
   setApplicantList: Dispatch<SetStateAction<ApplicantDataType[]>>
   getTransactionPerApplicant: ( params: number ) => TransactionType[] | []
   updateTransactionList: ( params: TransactionType, appointmentID?: number ) => void
   updateApplicantStatus: ( applicantID: number, status: 'active' | 'unselected' | 'pending' ) => void
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

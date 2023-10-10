import React from 'react'
import { getServerSession } from "next-auth";


const useUserSession = async () =>
{
   const session = await getServerSession();

   return session
}

export default useUserSession
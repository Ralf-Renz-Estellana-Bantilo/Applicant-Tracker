import { useSession } from 'next-auth/react';

const useUserSession = () =>
{
   const { data: session, status } = useSession();
   return { session, status }
}

export default useUserSession
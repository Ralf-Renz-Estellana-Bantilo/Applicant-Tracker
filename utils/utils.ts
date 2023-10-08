import { useRouter } from "next/navigation";

export function capitalize ( str: string )
{
  return str.charAt( 0 ).toUpperCase() + str.slice( 1 );
}
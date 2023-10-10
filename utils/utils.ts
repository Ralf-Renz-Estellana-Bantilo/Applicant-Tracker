import { ChipProps } from "@nextui-org/react";
import moment from "moment";
import { getServerSession } from "next-auth";

export function capitalize ( str: string )
{
  return str.charAt( 0 ).toUpperCase() + str.slice( 1 );
}

export const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  passed: "success",
  unselected: "danger",
  failed: "danger",
  pending: "warning",
};

export function formatDate ( date: string )
{
  return moment( date ).format( 'll' )
}

export function formatTime ( time: string )
{
  return moment( time, 'H:mm' ).format( 'hh:mm A' )
}

export const setSession = <T> ( key: string, value: T ) =>
{
  sessionStorage.setItem( key, `${value}` )
}

export const getSession = ( key: string ) =>
{
  return sessionStorage.getItem( key )
}

export const removeSession = ( key: string ) => sessionStorage.removeItem( key )

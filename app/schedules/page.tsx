'use client'

import { Card, CardBody, Chip, Tab, Tabs } from '@nextui-org/react'
import React from 'react'

const SchedulePage = () =>
{
   let tabs = [
      {
         id: "photos",
         label: "Previous",
         content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      },
      {
         id: "music",
         label: "Today",
         content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
      },
      {
         id: "videos",
         label: "Upcoming",
         content: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      }
   ];

   return (
      <div className="flex w-full flex-col h-full">
         <Tabs aria-label="Dynamic tabs" color='primary' variant='bordered' className='dark' fullWidth items={tabs}>
            {( item ) => (
               <Tab key={item.id} title={
                  <div className="flex items-center space-x-2">
                     <span>{item.label}</span>
                     <Chip size="sm" variant="solid" color='danger' >{Math.floor( Math.random() * 11 ) + 1}</Chip>
                  </div>
               }
                  className='w-full'>
                  <Card className='dark'>
                     <CardBody>
                        {item.content}
                     </CardBody>
                  </Card>
               </Tab>
            )}
         </Tabs>
      </div>
   );
}

export default SchedulePage
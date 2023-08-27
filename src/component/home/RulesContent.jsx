import React from 'react';
import { Fab, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { rules } from '@/data/Rules';

function RulesContent() {
  return (
    <div className=" overflow-y-auto rules p-10">
      <List >
        {rules.map((rule) => (
          <ListItem key={rule.id} className='items-start mt-6 sm:mt-0 rule'>
          
  
              <h1 className={rule.id !== 'Kindly Note' ? 'font-semibold  text-2xl min-w-[15%] ruleIcon' : 'ruleIcon ruleIconBg font-semibold text-2xl min-w-[15%] text-red-500'} >{rule.id}</h1>
         {rule.value !== 'last' ? <h1 className={'font-semibold text-center dash  text-3xl ml-2 min-w-[5%]'}>-</h1>:<h1 className={'font-semibold ml-2 min-w-[5%]'}></h1> }   
          {rule.value !== 'last' ? <h1 className='font-teko text-[#0e1129] text-2xl ml-8 ruleLabel '>{rule.label}</h1>
:            <h1 className='font-teko text-gray-800 text-xl ml-8 ruleLabel '>{rule.label}</h1>
 }   
         
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default RulesContent;

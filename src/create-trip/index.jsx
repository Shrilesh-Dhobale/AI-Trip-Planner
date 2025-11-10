import React from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { SelectBudgetOptions } from '@/constants/options';

function CreateTrip() {
  const [place,setplace]=useState();
  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>Tell us your travel preferences</h2>
      <p className='mt-3 text-gray-500 text-xl'>Just provide some basic information, and our trip planner</p>
      
      <div className='mt-20 flex flex-col gap-9'>
        <div>
          <h2 className='text-xl my-3 font-medium'>What is destination of choice?</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACES_API_KEY}
            selectProps={{
              place,
              onChange:(v)=>{setPlace(v);console.log(v)}
            }
            }
            />
        </div>
        <div>
          <h2 className='text-xl my-3 font-medium'>How many days are you planning for?</h2>
          <Input type="number" placeholder='Ex. 3'/>
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>What is Your Budget?</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectBudgetOptions.map((item,index)=>(
              <div key={index} className='p-4 border rounded-lg hover:shadow'>
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <p className='text-sm text-gray-500'>{item.desc}</p>
              </div>
          ))}
          </div>
        </div>
      </div>
     
    </div>
  )
}

export default CreateTrip

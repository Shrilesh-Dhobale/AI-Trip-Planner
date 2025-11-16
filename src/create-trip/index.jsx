import React from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { useState, useEffect } from 'react';
import { Input } from '../components/ui/input';
import { SelectBudgetOptions, SelectTravelList, AI_prompt } from '../constants/options';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';
import { chatSession } from '../service/AIModel';

function CreateTrip() {
  const [place,setplace]=useState();
  const [openDialog,setOpenDialog]=useState(false);
  const [formData,setFormData]=useState({});

  
  const handleInputChange=(name,value)=>{
    if(name==='days' && value>5){
      console.log("Days cannot be more than 5");
      toast.error("Days cannot be more than 5");
      return;
    }
    setFormData({
        ...formData,
      [name]: value
    })
  }

  useEffect(() => {
    console.log(formData);
  }, [formData])

  
  const onGenerateTrip=async ()=>{
    const user=localStorage.getItem('user');
    if(!user){
      return;
    }
    if (!formData?.location || !formData?.budget || !formData?.traveller || !formData?.days || formData?.days > 5){
      toast("Please fill all the fields correctly")
      return;
    }
  
    const FINAL_PROMPT=AI_prompt
    .replace('{location}',formData?.location)
    .replace('{totalDays}',formData?.days)
    .replace('{traveller}',formData?.traveller)
    .replace('{budget}',formData?.budget)
    .replace('{totalDays}',formData?.days);

    console.log(FINAL_PROMPT);
    
    const result=await chatSession.sendMessage(FINAL_PROMPT);
    const responseText=await result.response.text;
  }

  
  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>Tell us your travel preferences🏕️🏖️</h2>
      <p className='mt-3 text-gray-500 text-xl'>Just provide some basic information, and our trip planner</p>
      
      <div className='mt-20 flex flex-col gap-9'>
        <div>
          <h2 className='text-xl my-3 font-medium'>What is destination of choice?</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACES_API_KEY}
            selectProps={{
              value: place,
              onChange:(v)=>{setplace(v); handleInputChange('location', v.label); console.log(v);}
            }}
            />
        </div>
        <div>
          <h2 className='text-xl my-3 font-medium'>How many days are you planning for?</h2>
          <Input type="number" placeholder='Ex. 3' max="5"
          value={formData.days || ''}
          onChange={(e)=>handleInputChange('days',e.target.value)}
          />
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>What is Your Budget?</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectBudgetOptions.map((item,index)=>(
              <div key={index}
              onClick={()=>handleInputChange('budget',item.title)} 
              className={`p-4 border rounded-lg hover:shadow cursor-pointer 
                ${formData?.budget==item.title&&'shadow-lg border-blue-500'}`}
              >
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <p className='text-sm text-gray-500'>{item.desc}</p>
              </div>
          ))}
          </div>
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>Who do you plan on travelling with on your next adventure?</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectTravelList.map((item,index)=>(
              <div key={index}
              onClick={()=>handleInputChange('traveller',item.people)}
              className={`p-4 border rounded-lg hover:shadow cursor-pointer 
              ${formData?.traveller==item.people&&'shadow-lg border-blue-500'}`}
              >
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <p className='text-sm text-gray-500'>{item.desc}</p>
              </div>
          ))}
          </div>
        </div>
      </div>
      <div className='flex justify-end mt-10'>
        <Button onClick={onGenerateTrip}>Generate Trip</Button>
      </div>
    </div>
  )
}

export default CreateTrip

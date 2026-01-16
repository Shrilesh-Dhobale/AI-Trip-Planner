import React from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { useState, useEffect } from 'react';
import { Input } from '../components/ui/input';
import { SelectBudgetOptions, SelectTravelList, AI_prompt } from '../constants/options';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';
import { chatSession } from '../service/AIModel';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';



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
    if(name==='days' && value<1){
      console.log("Days cannot be less than 1");
      toast.error("Days cannot be less than 1");
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
  
  const login=useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const userData = await GetUserProfile(tokenResponse);
      localStorage.setItem('user', JSON.stringify(userData));
      setOpenDialog(false);
      toast.success("Login successful!");
    },
    onError:(error)=>console.log('error'),
    flow: 'auth-code',
    ux_mode: 'popup',
    redirectUri: window.location.origin
  });
  
  const onGenerateTrip=async ()=>{
    const user=localStorage.getItem('user');
    if(!user){
      setOpenDialog(true);
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
    console.log(result.response);
    const tripData = result.response;
    console.log(tripData);
  }
  const SaveAITrip=async (tripData)=>{
    const user=JSON.parse(localStorage.getItem('user'));
    const docId=Date.now().toString();
    await setDoc(doc(db, "cities", "LA"), {
    userSelection:formData,
    aiTripPlan:tripData,
  });
  }
  const GetUserProfile = async (tokenInfo) => {
    try {
      const response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
        headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
          Accept: 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  };
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
          <Input type="number" placeholder='Ex. 3' min="1" max="5"
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
      <Dialog open={openDialog} >
  
        <DialogContent>
        <DialogHeader>
        <DialogTitle>Sign In</DialogTitle>
        <DialogDescription>Please sign in to generate your personalized trip plan.</DialogDescription>
        <div className="text-center bg-white rounded-lg">
           <img src="/logo.png" alt="Logo" className="w-20 h-20 mx-auto mb-4" />
           <div className="text-2xl font-bold text-center mb-2">Sign In With Google</div>
           <Button
            onClick={()=>login()}
           className="w-full mb-5 flex gap-4 items-center">
            <FcGoogle className="h-7 w-7" />Sign In with Google</Button>
        </div>
        </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CreateTrip

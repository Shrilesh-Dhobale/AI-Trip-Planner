     export const SelectTravelList = [
    {
        id:1,
        title:"Just me",
        desc:"Solo trip tailored to your interests",
        icon:"✈︎",
        people:'1'
    },
    {
        id:2,
        title:"Couple",
        desc:"Romantic getaway for two",
        icon:"❤️",
        people:'2'
    },
    {
        id:3,
        title:"Family",
        desc:"Fun-filled trip for the whole family",
        icon:"👨‍👩‍👧‍👦",
        people:'3-5'
    },
     {
        id:4,
        title:"Group",
        desc:"Exciting adventure with friends",
        icon:"👥",
        people:'5+'
    }

]
export const SelectBudgetOptions = [
    {
        id:1,
        title:"Cheap",
        desc:"Budget-friendly options for cost-conscious travelers",
        icon:"💸",
    },
    {
        id:2,
        title:"Moderate",
        desc:"Balanced options for a comfortable trip",
        icon:"🛍️",
    },
    {
        id:3,
        title:"Luxury",
        desc:"Premium options for a lavish experience",
        icon:"💎",
    }
]
export const AI_prompt = `Generate Travel Plan for Location : {location}, for {totalDays} for {traveller} with a {budget} budget ,Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for {totalDays} with each day plan with best time to visit in JSON format.`;


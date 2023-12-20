import asyncHandler from "express-async-handler";

import { prisma } from "../config/prismaConfig.js";

export const createUser = asyncHandler(async (req, res)=> {
console.log("creating a user");

let { email }=req.body;

const userExists = await prisma.user.findUnique({where:{email:email}});
if(!userExists){
    const user= await prisma.user.create({data: req.body});
    res.send({
        message:"User regeseterd successfully",
        user:user,
    });
} else res.status(201).send({message:"user already regesterd"});
});


//function to book a visit to property

export const bookVisit=asyncHandler(async(req,res)=>{
    const {email,date}=req.body
    const {id}=req.params

    try{
        const alreadyBooked=await prisma.user.findUnique({
            where:{email},
            select:{bookedvisit:true}
        })

        if(alreadyBooked.bookedvisit.some((visit)=>visit.id===id)){
            res.status(400).json({message:"This property is already booked by you"})
        }
        else{
            await prisma.user.update({
                where:{email:email},
                data:{
                    bookedvisit:{push:{id,date}}
                }
            })
        }
        res.send("your visits is booked successfully")
    }catch(err)
    {
        throw new Error(err.message)
    }

});

//function to get all bookings of a user

export const allBookings=asyncHandler(async(req,res)=>{
    const {email}=req.body
    try {
        const bookings=await prisma.user.findUnique({
            where:{email},
            select:{bookedvisit:true}
        })
        res.status(200).send(bookings)
    }catch(err)
    {
        throw new Error(err.message);
    }
})


//function to cancel the booking

export const cancelBooking=asyncHandler(async(req,res)=>{
    const {email}=req.body;
    const {id}=req.params
    try{
const user=await prisma.user.findUnique({
    where:{email:email},
    select:{bookedvisit:true}
})
const index=user.bookedvisit.findIndex((visit)=>visit.id===id)

if(index===-1)
{
    res.status(404).json({message:"Booking not found"})
} else {
    user.bookedvisit.splice(index,1)
    await prisma.user.update({
        where: {email},
        data:{
            bookedvisit:user.bookedvisit
        }
    })
    res.send("Booking cancelled succssfully")
}

    }catch(err)
    {
        throw new Error(err.message);
    }
})

//function to add a favourite property list of user

export const fav=asyncHandler(async(req,res)=>{
const {email}=req.body;
const {pid}=req.params;

try{

const user=await prisma.user.findUnique({
    where:{email}
})
if(user.favResidenceisID.includes(pid)){
    const updateUser=await prisma.user.update({
        where:{email},
        data:{
            favResidenceisID:{
                    set:user.favResidenceisID.filter((id)=>id!==pid)
            }
}
    });
    res.send({message:"Removed from favourites",user:updateUser})
}else {
    const updateUser=await prisma.user.update({
        where:{email},
        data:{
            favResidenceisID:{
                push:pid
            }
        }
    })
    res.send({message:"updated favourites",user:updateUser})
}

}catch(err)
{
    throw new Error(err.message);
}
})

//function to get all fav property list

export const allfav=asyncHandler(async(req,res)=>{
    const {email}=req.body;
    try{
const favpro=await prisma.user.findUnique({
    where:{email},
    select:{favResidenceisID:true}
})
res.status(200).send(favpro);
    }catch(err)
    {
        throw new Error(err.message);
    }
})
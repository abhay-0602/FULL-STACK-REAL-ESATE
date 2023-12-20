import asyncHandler from "express-async-handler";

import { prisma } from "../config/prismaConfig.js";

export const createProperty=asyncHandler(async(req,res)=>{
  const{title,description,price,address,image,facilities,userEmail}=req.body.data
  console.log(req.body.data)
  try{
const property= await prisma.property.create({
    data:{
        title,
        description,
        price,
        address,
        image,
        facilities,
        owner:{connect:{email:userEmail}},   
    },
});
res.send({message:"property created successfully",property})
} catch(err) {
    if(err.code==="P2002")
    {
        throw new Error("A property with address already there")
    }
    throw new Error(err.message);
  }
});


//function to get all  documents

export const getallProperty = asyncHandler(async (req,res) =>{
    const {id}=req.params;
    try{
        const property=await prisma.property.findUnique({
            where:{id},
        });
        res.send(property);
    }catch(err)
    {
        throw new Error(err.message);
    }
    const properties=await prisma.property.findMany(
        {
        
        
        orderBy:{
            
            createdAt:"desc",
        

        },
    });
    res.send(properties);
  
});

//function to get specific document property

export const getProperty=asyncHandler(async(req,res)=>{
    const {id}=req.params;

    try{
        const property=await prisma.property.findUnique({
            where:{id},
        });
        res.send(property);
    }catch(err)
    {
        throw new Error(err.message);
    }
})
import { db } from "./db"

export const getUserbyUsername = async (username : string) => {
   const user = await db.user.findUnique({
     where:{
        username,
     },
     include:{
       stream:true, 
     },
   });

   return user;
};

export const getUserById = async (id : string) => {
   const user = await db.user.findUnique({
      where:{
         id,
      },
      include:{
         stream:true, 
       },
   });

   return user;
}


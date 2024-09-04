import { db } from "./db"

export const getUserbyUsername = async (username : string) => {
   const user = await db.user.findUnique({
     where:{
        username,
     },
   });

   return user;
};

export const getUserbyUserId = async (id : string) => {
   const user = await db.user.findUnique({
      where:{
         id,
      }
   });

   return user;
}


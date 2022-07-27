import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res){
    if(req.method === 'POST'){
        return await checkUserCreated(req, res);
    }else{
        res.status(405).json({
            message: 'Method not allowed',
            success: false
        })
    }
}

async function checkUserCreated(req, res){
    const { userId } = req.body;
    try{
        const checkUserEntry = await prisma.user.findMany({
            where: {
                uid: userId,
            }
        })
        if(checkUserEntry.length > 0){
            return res.status(200).json({
                data: checkUserEntry[0],
                new: false, 
                success: true
            })
        }else{
            // create the user
            const body = req.body;
            const newUser = await prisma.user.create({
                data: {
                    uid: body.uid,
                    tasks: "[]"
                }
            })
            return res.status(200).json({
                message: newUser,
                new: true, 
                success: true
            })
        }   
    }catch (error) {
        console.error("Request error", error);
        res.status(500).json({ error: "Error creating user", success:false });
    }
}
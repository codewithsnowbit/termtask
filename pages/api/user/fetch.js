import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res){
    if(req.method === 'GET'){
        return await getUserDetails(req, res);
    }else{
        res.status(405).json({
            message: 'Method not allowed',
            success: false
        })
    }
}

async function getUserDetails(req, res){
    // get the user's id from the url
    const { userId } = req.query;
    try{
        const checkUserEntry = await prisma.user.findMany({
            where: {
                uid: userId,
            }
        })
        if(checkUserEntry.length > 0){
            return res.status(200).json({
                data: checkUserEntry[0],
                success: true
            })
        }else{
                return res.status(200).json({
                message: "Invalid User",
                success: false
            })
        }   
    }catch (error) {
        console.error("Request error", error);
        res.status(500).json({ error: "Error creating user", success:false });
    }
}
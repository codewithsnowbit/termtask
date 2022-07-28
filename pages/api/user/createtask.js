import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res){
    if(req.method === 'POST'){
        return await createTask(req, res);
    }else{
        res.status(405).json({
            message: 'Method not allowed',
            success: false
        })
    }
}

async function createTask(req, res){
    const { userId } = req.body;
    try{
        const body = req.body;
        // update the user's task list
        const updateTask = await prisma.user.update({
            where: {
              uid: "user_2CWMGGuf2n9Q8NneO5NSYuzgVll",
            },
            data: {
              tasks: body.value,
            },
          })
        res.status(200).json({
            message: 'Task created',
            success: true,
            data: updateTask
        })
    }catch (error) {
        console.error("Request error", error);
        res.status(500).json({ error: "Error creating tasks", success:false });
    }
}
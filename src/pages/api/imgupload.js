import { prisma } from "@/server/prismaInstance";

const handler = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }
const {token,url}=await req.body
    try {

        const findStudent = await prisma.student.findFirst({
            where: {
                token: token // Use the token from the destructured req.body
            }
        });

        if (!findStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }

        const document = await prisma.document.create({
            data: {
                createdAt:0, // Use UNIX timestamp for createdAt
                url: url,
               studentId: findStudent.id
            }
        });

        return res.status(200).json(document);
    } catch (error) {
        console.error(error); // Log the error for debugging purposes
        return res.status(500).json({ message: 'Internal server error',error });
    }
};

export default handler;

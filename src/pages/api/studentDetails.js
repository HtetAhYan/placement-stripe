import { prisma } from "@/server/prismaInstance";
import { createHash } from "crypto";
import nc from "next-connect-v0";

const handler = nc();
function generateRandomToken() {
  const randomBytes = createHash('sha256')
    .update(Math.random().toString())
    .digest('hex');
  
  return randomBytes;
}
handler.post(async (req, res) => {
  try {
    const {data,url} = req.body;
    const {
      email,
      studentName,
      dob,
      fatherName,
      passedGrade,
      gradeToAttend,
      campusTime,
      intakes,
      oldSchoolName,
      city,
      country,
      phoneNumber,
      residentialAddress,
    } = data;
const token=generateRandomToken();
    // Create a new student record in the database
    const createdStudent = await prisma.student.create({
      data: {
        email: email,
        studentName: studentName,
        dob: dob,
        fatherName: fatherName,
        passedGrade: passedGrade,
        country: country,
        campusTime: campusTime,
        city: city,
        intakes: intakes,
        phoneNumber: phoneNumber,
        residentialAddress: residentialAddress,
        gradeToAttend: gradeToAttend,
        oldSchoolName: oldSchoolName,
        createdAt: Date.now(),
        token:token
        ,url:url
      },
    });

    res.status(201).json({createdStudent});
  } catch (error) {
    res.status(500).json({ error: "An error occurred while creating the student." },error.message);
  }
});

handler.all((req, res) => {
  res.status(405).json({ message: "Method not allowed" });
});

export default handler;

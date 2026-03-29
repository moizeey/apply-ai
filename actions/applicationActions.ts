'use server'

import connectToDatabase from "@/lib/mongodb";
import Application from "@/models/Application";
import { revalidatePath } from 'next/cache';
import { GoogleGenerativeAI } from "@google/generative-ai";


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)


export async function addApplication(formData: FormData) {
    await connectToDatabase();

    const company = formData.get('company') as string;
    const role = formData.get('role') as string;
    const jobDescription = formData.get('jobDescription') as string;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
    You are an expert career coach. Write a short, professional, and highly tailored cover letter 
    for a software engineering student applying for a ${role} position at ${company}. 
    The applicant has strong skills in the MERN stack (MongoDB, Express, React, Node.js) and Tailwind CSS.
    
    Please tailor the letter directly to the following job description:
    ${jobDescription}
    
    Keep it to 3 short paragraphs. Do not include placeholder brackets like [Your Name] at the bottom, just end it professionally.
    `

    const result = await model.generateContent(prompt);
    const generatedCoverLetter = result.response.text();

    await Application.create({
        company,
        role,
        jobDescription,
        coverLetter: generatedCoverLetter,
        status: 'Wishlist'
    })

    revalidatePath('/');
}

export async function deleteApplication(id: string) {
    await connectToDatabase();
    await Application.findByIdAndDelete(id);
    revalidatePath('/')
}

export async function updateApplicationStatus(id: string, newStatus: string) {
    await connectToDatabase();
    await Application.findByIdAndUpdate(id, { status: newStatus })
    revalidatePath('/')
}
"use server"

import { headers } from "next/headers"
import { auth } from "../../lib/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

class UserNotFoundErr extends Error { }

export async function getFormStats() {

    try {

        const session = await auth.api.getSession({
            headers: await headers()
        })

        if (!session) {
            throw new UserNotFoundErr()
        }

        const stats = await prisma.form.aggregate({
            where: {
                userId: session.user.id
            },
            _sum: {
                visits: true,
                submissions: true
            }
        })

        const visits = stats._sum.visits || 0
        const submissions = stats._sum.submissions || 0

        let submissionRate = 0

        if (visits > 0) {
            submissionRate = (submissions / visits) * 100
        }

        const bounceRate = 100 - submissionRate

        return {
            visits, submissions, submissionRate, bounceRate
        }
    } catch (error: any) {
        console.error("Failed to fetch stats:", error.message);
        return { visits: 0, submissions: 0, submissionRate: 0, bounceRate: 0 };
    }
}


export async function createForm(name: string, description: string | undefined) {

    try {
        const session = await auth.api.getSession({
            headers: await headers()
        })

        if (!session) {
            throw new UserNotFoundErr()
        }

        const newForm = await prisma.form.create({
            data: {
                name,
                description,
                userId: session.user.id,
            },
        });

        // Revalidate the dashboard page or wherever forms are listed
        revalidatePath("/form-home");

        return { success: true, message: "Form created successfully", form: newForm };
    } catch (error) {
        console.error("Error creating form:", error);
        return { success: false, message: "Failed to create form" };
    }

}

export async function getForms() {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        throw new UserNotFoundErr()
    }

    return await prisma.form.findMany({
        where: {
            userId: session.user.id
        },
        orderBy: {
            createdAt: "desc"
        }
    })
}
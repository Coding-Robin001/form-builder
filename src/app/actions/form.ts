import { headers } from "next/headers"
import { auth } from "../../lib/auth"
import { prisma } from "@/lib/prisma"




class UserNotFoundErr extends Error { }


export async function getFormStats() {
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
}

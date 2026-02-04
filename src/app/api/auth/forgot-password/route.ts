import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { randomBytes } from 'crypto'

const forgotSchema = z.object({
    email: z.string().email(),
})

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const result = forgotSchema.safeParse(body)

        if (!result.success) {
            return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
        }

        const { email } = result.data

        const user = await prisma.user.findUnique({
            where: { email },
        })

        if (!user) {
            // Return success even if user not found to prevent enumeration
            return NextResponse.json({ success: true, message: 'If user exists, email sent' })
        }

        const token = randomBytes(32).toString('hex')
        const expiry = new Date(Date.now() + 1000 * 60 * 60) // 1 hour

        await prisma.user.update({
            where: { email },
            data: {
                resetToken: token,
                resetTokenExpiry: expiry,
            },
        })

        // Mock Email sending
        console.log(`[MOCK EMAIL] Password Reset Link: http://localhost:3000/reset-password?token=${token}`)

        return NextResponse.json({ success: true, message: 'Email sent' })
    } catch (error) {
        console.error('Forgot Password error:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

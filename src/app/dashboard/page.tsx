import { getSession, logout } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default async function DashboardPage() {
    const session = await getSession()

    if (!session) {
        redirect('/login')
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <Card className="max-w-4xl mx-auto">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Dashboard</CardTitle>
                    <form action={async () => {
                        'use server'
                        await logout()
                        redirect('/login')
                    }}>
                        <Button variant="outline">Sign Out</Button>
                    </form>
                </CardHeader>
                <CardContent>
                    <p className="text-lg">Welcome back!</p>
                    <p className="text-gray-500 mt-2">
                        User ID: {session.userId}
                    </p>
                    <p className="text-gray-500">
                        Session Expires: {new Date(session.expires).toLocaleString()}
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}

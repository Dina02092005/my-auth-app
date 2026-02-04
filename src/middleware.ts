import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { updateSession } from '@/lib/auth'

export async function middleware(request: NextRequest) {
    // Update session expiration if it exists
    const response = await updateSession(request)

    // If updateSession returned a response (session refreshed), use it, otherwise create new
    const res = response || NextResponse.next()

    const session = request.cookies.get('session')
    const { pathname } = request.nextUrl

    // Protected routes
    if (pathname.startsWith('/dashboard')) {
        if (!session) {
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }

    // Auth routes (redirect to dashboard if already logged in)
    if (pathname === '/login' || pathname === '/register') {
        if (session) {
            return NextResponse.redirect(new URL('/dashboard', request.url))
        }
    }

    return res
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}

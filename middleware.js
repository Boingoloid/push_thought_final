export { default } from 'next-auth/middleware'

export const config = {
    matcher: ['/campaigns/add', '/profile', '/campaigns/saved','/messages']
}
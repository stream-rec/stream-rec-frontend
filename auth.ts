import NextAuth, { DefaultSession, User } from "next-auth"
import credentials from "next-auth/providers/credentials"
import { login } from "@/src/lib/data/user/user-apis"


declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id?: string
      name?: string | null
      email?: string | null
      image?: string | null
      token: string
      role: string
      isFirstUsePassword: boolean
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & DefaultSession["user"]
  }

  interface User {
    token: string
    role: string
    isFirstUsePassword: boolean
  }
}


const credentialsProvider = credentials({
  name: 'Credentials',
  credentials: {
    username: { label: "Username", type: "text" },
    password: { label: "Password", type: "password" }
  },
  authorize: async (credentials, req) => {
    if (typeof credentials === "undefined") {
      return null
    }

    let user: User | null = null

    const res = await login(credentials.username as string, credentials.password as string)
    const validTo = new Date(res.validTo)
    const now = new Date()
    if (validTo < now) {
      return null
    }

    const role = res.role ?? 'USER'
    const isFirstUsePassword = res.isFirstUsePassword ?? false

    if (res.token) {
      user = {
        id: res.id.toString(),
        name: credentials.username as string,
        email: '',
        token: res.token,
        role: role,
        isFirstUsePassword: isFirstUsePassword
      }
    }
    return user
  }
})


export const { auth, handlers, signIn, signOut } = NextAuth({
  debug: process.env.NODE_ENV === "development",
  providers: [credentialsProvider],
  callbacks: {
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      // check token
      if (auth?.user?.token) {
        return true
      }
      return false
    },
    jwt: async ({ token, user, account, profile, trigger, isNewUser }) => {
      if (!user) {
        return token
      }
      if (user) {
        token.id = user.id ?? 0
        token.accessToken = user.token
        token.isFirstUsePassword = user.isFirstUsePassword ?? false
        if (trigger === 'signIn') {
          token.role = user.role
        }
      }
      return token
    },
    session: async ({ session, token, user }) => {
      if (token) {
        session.user = {
          ...session.user,
          id: token.id!!.toString(),
          name: token.name ?? '',
          role: token.role as string,
          token: token.accessToken as string,
          isFirstUsePassword: token.isFirstUsePassword as boolean,
        }
      }
      return session
    }
  },
  pages: {
    signIn: '/login',
    signOut: '/logout'
  },
  session: {strategy: "jwt", maxAge: 7 * 24 * 60 * 60}
})
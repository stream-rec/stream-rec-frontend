import {AuthOptions, getServerSession, User} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {login} from "@/src/lib/data/user/user-apis";
import type {GetServerSidePropsContext, NextApiRequest, NextApiResponse,} from "next"


interface JwtUser extends User {
  token: string
  role: string
  isFirstUsePassword: boolean
}


export const authOptions: AuthOptions = {
  debug: process.env.NODE_ENV === "development",
  callbacks: {
    async jwt({token, user, account, profile, trigger, isNewUser}) {
      // console.log("jwt token", token)
      // console.log("jwt user", user)
      // console.log("jwt account", account)
      // console.log("jwt profile", profile)
      // console.log("jwt trigger", trigger)
      // console.log("jwt isNewUser", isNewUser)
      const loggedUser = user as JwtUser

      if (user) {
        token.id = loggedUser.id ?? 0
        token.accessToken = loggedUser.token
        token.isFirstUsePassword = loggedUser.isFirstUsePassword ?? false
        if (trigger === 'signIn') {
          token.role = loggedUser.role
        }
      }

      return token
    },
    async session({session, token, user}) {
      // console.log("session session", session)
      // console.log("session token", token)
      // console.log("session user", user)
      if (token) {
        session.user = {
          id: token.id!!.toString(),
          username: token.name ?? '',
          role: token.role as string,
          jwt: token.accessToken as string,
          isFirstUsePassword: token.isFirstUsePassword as boolean
        }
      }
      return session
    },
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {label: "Username", type: "text"},
        password: {label: "Password", type: "password"}
      },
      async authorize(credentials, req) {
        if (typeof credentials !== "undefined") {

          const res = await login(credentials.username, credentials.password)
          const validTo = new Date(res.validTo)
          const now = new Date()
          if (validTo < now) {
            return null
          }

          const role = res.role ?? 'USER'
          const isFirstUsePassword = res.isFirstUsePassword ?? false

          if (res.token) {
            return {
              id: res.id.toString(),
              name: credentials.username,
              email: '',
              token: res.token,
              role: role,
              isFirstUsePassword: isFirstUsePassword
            } as JwtUser
          }
          return null

        } else {
          return null
        }
      },
    })
  ],
  session: {strategy: "jwt", maxAge: 7 * 24 * 60 * 60}
}

// Use it in server contexts
export function auth(
    ...args:
        | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
        | [NextApiRequest, NextApiResponse]
        | []
) {
  return getServerSession(...args, authOptions)
}
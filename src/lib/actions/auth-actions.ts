"use server"

import { headers } from "next/headers"
import { auth } from "../auth"
import { redirect } from "next/navigation"

export const signUp = async (email: string, password: string, name: string) => {
  try {
    const result = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
        callbackURL: "/auth-dashboard",
      },
    })
    return result
  } catch (err: any) {
    console.error("SignUp Error:", err)

    if (err.statusCode === 422) {
      throw new Error("This email is already registered. Please sign in instead.")
    }
    throw new Error("Sign up failed. Please try again.")
  }
}

export const signIn = async (email: string, password: string) => {
  try {
    const result = await auth.api.signInEmail({
      body: {
        email,
        password,
        callbackURL: "/auth-dashboard",
      },
    })
    return result
  } catch (err: any) {
    if (err.statusCode === 401) {
      throw new Error("Invalid email or password.")
    }
    throw new Error("Sign in failed. Please try again.")
  }
}


export const signInSocial = async (provider: "google" | "github") => {
  const { url } = await auth.api.signInSocial({
    body: {
      provider,
    },
  });

  if (url) redirect(url);
};


export const signOut = async () => {
  try {
    const result = await auth.api.signOut({ headers: await headers() })
    return result
  } catch {
    throw new Error("Sign out failed.")
  }
}

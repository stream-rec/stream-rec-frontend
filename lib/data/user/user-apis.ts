'use server'

import {fetchApi} from "@/lib/data/api";
import {md5} from "@/lib/utils";


export const login = async (username: string, password: string) => {
  const hashedPassword = md5(password)
  const response = await fetchApi('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({username, password: hashedPassword})
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error("Error logging in, status: " + response.status + " " + errorText)
  }
  return await response.json() as {
    id: number,
    token: string,
    validTo: number
    // TODO : Remove undefined in next versions
    isFirstUsePassword: boolean | undefined,
    role: string | undefined
  }
}

export const recoverPassword = async (username: string) => {
  const response = await fetchApi('/auth/recover', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({username})
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error("Error recovering password, status: " + response.status + " " + errorText)
  }
  return await response.text()
}


export const changePassword = async (id: string, password: string | undefined, hashedPassword: string | null, newPassword: string) => {
  const finalPassword = hashedPassword ?? (password?.trim() && md5(password.trim()));

  if (!finalPassword) {
    throw new Error("Password is required");
  }

  const hashedNewPassword = md5(newPassword)
  const response = await fetchApi(`/user/${id}/password`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({id, password: finalPassword, newPassword: hashedNewPassword})
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error("status: " + response.status + " " + errorText)
  }
  return await response.text()
}
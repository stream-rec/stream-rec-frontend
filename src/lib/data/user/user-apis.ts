'use server'

import {fetchApi} from "@/src/lib/data/api";


export const login = async (username: string, password: string) => {
  const response = await fetchApi('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({username, password: password})
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


export const changePassword = async (id: string, password: string, newPassword: string) => {
  const response = await fetchApi(`/user/${id}/password`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({id, password: password.trim(), newPassword: newPassword})
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error("status: " + response.status + " " + errorText)
  }
  return await response.text()
}
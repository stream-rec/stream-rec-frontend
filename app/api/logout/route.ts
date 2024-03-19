import {removeAccessToken, removeValidUntil} from "@/lib/data/auth/tokens";

export async function POST() {
  await removeAccessToken()
  await removeValidUntil()
  return
}
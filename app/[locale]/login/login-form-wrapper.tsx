import {LoginForm, LoginFormStrings} from "@/app/[locale]/login/login-form";
import {login, recoverPassword} from "@/lib/data/user/user-apis";
import {storeToken} from "@/lib/data/auth/tokens";
import {cookies} from "next/headers";


export default async function LoginFormWrapper({strings}: { strings: LoginFormStrings }) {


  const defaultValues = {
    id: 0,
    username: cookies().get("username")?.value || "",
    password: ""
  }


  return <>
    <LoginForm defaultValues={defaultValues} submit={login} storeToken={storeToken} strings={strings}
               recoverPassword={recoverPassword}/>
  </>
}
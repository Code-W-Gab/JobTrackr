import Login from "../../components/ui/auth/Login";
import LoginInfo from "../../components/ui/auth/loginInfo";

export default function LoginLayout() {
  return(
    <main className="flex justify-center sm:grid sm:grid-cols-2 min-h-screen">
      <LoginInfo/>
      <Login/>
    </main>
  )
}
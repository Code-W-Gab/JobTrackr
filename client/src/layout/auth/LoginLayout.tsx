import Login from "../../components/ui/auth/Login";
import LoginInfo from "../../components/ui/auth/loginInfo";

export default function LoginLayout() {
  return(
    <main className="grid justify-center lg:grid-cols-2 min-h-screen">
      <LoginInfo/>
      <Login/>
    </main>
  )
}
import RegisterInfo from "../../components/ui/auth/registerInfo";
import Register from "../../components/ui/auth/Register";

export default function RegisterLayout() {
  return(
    <main className="grid grid-cols-2 min-h-screen">
      <RegisterInfo/>
      <Register/>
    </main>
  )
}
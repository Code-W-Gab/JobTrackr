import BackToMenuBtn from "../../common/BackToMenuBtn";
import Input from "../../common/Input";
import { useState } from "react";
import { Zap, Check } from "lucide-react";


const infoItems: string[] = [
  "Your account is always protected",
  "Reset link expire in 15 minutes",
  "Contact support if you need help"
]

type ForgotStep = "email" | "send" | "reset" | "done"

export default function ForgotPassword(){
  const [email, setEmail] = useState<string>("");
  const [step, setStep] = useState<ForgotStep>("email")

  return(
    <main>
      <div className="grid grid-cols-2 min-h-screen">
        <section className="bg-indigo-700 p-10 flex flex-col justify-between">
          <div>
            <BackToMenuBtn name="Back to home" to="/home" color="text-gray-300" hoverColor="text-gray-100"/>
            <div className="flex items-center gap-2 my-10">
              <div className="text-white bg-indigo-500 rounded-lg p-1.5">
                <Zap size={16}/>
              </div>
              <h1 className="font-bold text-lg text-white">JobTrackr</h1>
            </div>

            <div className="text-white">
              <h1 className="text-3xl font-bold">Forgot your password?</h1>
              <p className="text-gray-300 mt-4">No worries. Enter your email and we'll send you a reset link right away.</p>
            </div>
          </div>

          <div className="space-y-3">
            {infoItems.map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-white text-sm">
                <div className="text-white bg-indigo-500 rounded-full flex items-center gap-2 w-max p-1">
                  <Check size={12}/>
                </div>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white flex items-center justify-center p-8">
          <div className="flex flex-col space-y-6">
            <BackToMenuBtn name="Back to login" to="/auth/login" color="text-gray-500" hoverColor="text-indigo-600"/>
            <div className="flex items-center gap-2">
              {["Email", "Verification", "Reset"].map((item, index) => {
                return(
                  <div className="flex items-center gap-2">
                    <div className="size-6 p-2 rounded-full text-sm text-white flex items-center justify-center bg-indigo-500">{index + 1}</div>
                    <p className="text-xs text-indigo-500">{item}</p>
                    {index < 2 ? <div className="w-6 h-px bg-gray-300"></div> : ""}
                  </div>
                )
              })}
            </div>
            <div className="w-full max-w-sm">
              <h1 className="text-2xl font-bold text-black">Forgot password?</h1>
              <p className="text-sm text-gray-600 mt-1">Enter the email address associated with your account and we'll send you a 6-digit verification code.</p>
            </div>
            <div className="space-y-3">
              <Input name="Email" type="email" placeholder="you@example.com" value={email} setValue={setEmail}/>
              <button disabled={!email} className="disabled:opacity-50 disabled:cursor-not-allowed w-full text-sm text-white py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 cursor-pointer">See Verification code</button>
            </div>
            <div className="text-xs text-slate-500 text-center">Remember your password? <span className="text-sm font-medium text-indigo-500 hover:underline">Sign in</span></div>
          </div>
        </section>
      </div>
    </main>
  )
}
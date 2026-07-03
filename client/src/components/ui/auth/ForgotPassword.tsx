import BackToMenuBtn from "../../common/BackToMenuBtn";
import Input from "../../common/Input";
import { useState } from "react";
import { Zap, Check, ArrowLeft, Mail, CheckCircle, ShieldCheck, CircleCheckBig } from "lucide-react";
import InputPassword from "../../common/InputPassword";
import { Link } from "react-router-dom";

const infoItems: string[] = [
  "Your account is always protected",
  "Reset link expire in 15 minutes",
  "Contact support if you need help"
]

type ForgotStep = "email" | "send" | "reset" | "done"

export default function ForgotPassword(){
  const [email, setEmail] = useState<string>("");
  const [step, setStep] = useState<ForgotStep>("email")
  const [otp, setOtp] = useState<string>("")
  const [newPassword, setNewPassword] = useState<string>("")
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("")

  const passwordsMatch = newPassword && confirmNewPassword && newPassword === confirmNewPassword;
  const strength = [newPassword.length >= 8, /[A-Z]/.test(newPassword), /[0-9]/.test(newPassword), /[^A-Za-z0-9]/.test(newPassword)].filter(Boolean).length;
  const strengthColors = ['bg-red-400', 'bg-orange-400', 'bg-amber-400', 'bg-emerald-400'];
  const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong'];

  function handleTest(){
    setStep("send")
  }

  return(
    <main>
      <div className={`min-h-screen ${step !== "done" ? "grid grid-cols-2" : "flex items-center justify-center"}`}>
        {step !== "done" && (
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
                <h1 className="text-3xl font-bold">{step === "email" ? "Forgot your password?" : step === "send" ? "Check your email" : step === "reset" ? "Create a new password" : ""}</h1>
                <p className="text-gray-300 mt-4">{step === "email" ? "No worries. Enter your email and we'll send you a reset link right away." : step === "send" ? "We've sent a 6-digit code to your inbox. Enter it below to continue" : step === "reset" ? "Choose something strong and unique. We recommend using mix of letters, numbers, and symbols." : ""}</p>
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
          )
        }

        {step === 'email'
        ? <section className="bg-white flex items-center justify-center p-8">
            <div className="flex flex-col space-y-6">
              <BackToMenuBtn name="Back to login" to="/auth/login" color="text-gray-500" hoverColor="text-indigo-600"/>
              <div className="flex items-center gap-2">
                {["Email", "Verification", "Reset"].map((item, index) => {
                  return(
                    <div className="flex items-center gap-2">
                      <div className={`size-6 p-2 rounded-full text-sm text-white flex items-center justify-center ${index === 0 ? "bg-indigo-500" : "bg-gray-200"}`}>{index + 1}</div>
                      <p className= {`text-xs ${index === 0 ? "text-indigo-500" : "text-gray-400"}`}>{item}</p>
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
                <button disabled={!email} onClick={handleTest} className="disabled:opacity-50 disabled:cursor-not-allowed w-full text-sm text-white py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 cursor-pointer">See Verification code</button>
              </div>
              <div className="text-xs text-slate-500 text-center">Remember your password? <span className="text-sm font-medium text-indigo-500 hover:underline">Sign in</span></div>
            </div>
          </section>
        : step === "send" 
        ? <section className="bg-white flex items-center justify-center p-8">
            <div className="flex flex-col space-y-6">
              <button onClick={() => setStep("email")} className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-400 transition-colors duration-300">
                <ArrowLeft size={14}/>
                <span>Back</span>
              </button>
              <div className="flex items-center gap-2">
                {["Email", "Verification", "Reset"].map((item, index) => {
                  return(
                    <div className="flex items-center gap-2">
                      <div className={`size-6 p-2 rounded-full text-sm text-white flex items-center justify-center ${index < 2 ? "bg-indigo-500" : "bg-gray-200"}`}>{index + 1}</div>
                      <p className= {`text-xs ${index < 2 ? "text-indigo-500" : "text-gray-400"}`}>{item}</p>
                      {index < 2 ? <div className={`w-6 h-px ${index < 2 ? "bg-indigo-500" : "bg-gray-300"}`}></div> : ""}
                    </div>
                  )
                })}
              </div>
              <div className="w-full max-w-sm">
                <h1 className="text-2xl font-bold text-black">Enter verification code</h1>
                <p className="text-sm text-gray-500 mt-1">We send a 6-digit code <span className="font-medium text-gray-700">{email}</span>. it expires in 15 minutes.</p>
              </div>
              <div className="border border-gray-300 bg-gray-100 p-6 rounded-xl flex items-start gap-4">
                <div className="p-2 rounded-full bg-indigo-100 text-indigo-600 "><Mail size={14}/></div>
                <div className="space-y-0.5">
                  <p className="font-medium text-sm">Password reset email send</p>
                  <p className="text-sm text-gray-500">Check <span className="text-gray-600 font-medium">{email}</span> for your code.</p>
                  <div className="flex items-center gap-2">
                    <div className="size-1.5 rounded-full bg-green-500"></div>
                    <p className="text-indigo-500 text-xs">Email send successfully</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <Input name="6-digit verification code" type="text" placeholder="Enter 6-digit code" value={otp} setValue={setOtp}/>
                <div className="flex items-center justify-between px-1">
                  <div className="text-xs text-gray-400">Expire in <span className="text-xs text-indigo-500">14:43</span></div>
                  <button className="text-indigo-500 text-xs">Resend code</button>
                </div>
                <button disabled={!otp} onClick={() => setStep("reset")} className="disabled:opacity-50 disabled:cursor-not-allowed w-full text-sm text-white py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 cursor-pointer">Verify</button>
                <div className="text-xs text-slate-500 text-center">Didn't receive it? Check your spam folder or <button onClick={() => setStep("email")} className="text-sm font-medium text-indigo-500 hover:underline cursor-pointer">try a different email</button></div>
              </div>
            </div>
          </section>
        : step === "reset"
        ? <section className="bg-white flex items-center justify-center p-8">
            <div className="flex flex-col space-y-6">
              <button onClick={() => setStep("email")} className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-400 transition-colors duration-300">
                <ArrowLeft size={14}/>
                <span>Back</span>
              </button>
              <div className="flex items-center gap-2">
                {["Email", "Verification", "Reset"].map((item, index) => {
                  return(
                    <div className="flex items-center gap-2">
                      <div className={`size-6 p-2 rounded-full text-sm text-white flex items-center justify-center ${index <= 2 ? "bg-indigo-500" : "bg-gray-200"}`}>{index + 1}</div>
                      <p className= {`text-xs ${index <= 2 ? "text-indigo-500" : "text-gray-400"}`}>{item}</p>
                      {index <= 2 ? <div className={`w-6 h-px ${index < 2 ? "bg-indigo-500" : "bg-gray-300"}`}></div> : ""}
                    </div>
                  )
                })}
              </div>
              <div className="w-full max-w-sm">
                <h1 className="text-2xl font-bold text-black">Set new password</h1>
                <p className="text-sm text-gray-500 mt-1">Your new password must be different from your previous password.</p>
              </div>
              <div>
                <div className="space-y-3">
                  <InputPassword name="New password" textType="text" passwordType="password" placeholder="Create a strong password" value={newPassword} setValue={setNewPassword}/>
                  {newPassword && (
                    <div className="mt-2 space-y-2">
                      <div className="flex gap-1">
                        {[...Array(4)].map((_, i) => (
                          <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${i < strength ? strengthColors[strength - 1] : 'bg-slate-200 dark:bg-slate-700'}`} />
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-x-3 gap-y-1">
                          {[
                            { label: '8+ chars', pass: newPassword.length >= 8 },
                            { label: 'Uppercase', pass: /[A-Z]/.test(newPassword) },
                            { label: 'Number', pass: /[0-9]/.test(newPassword) },
                            { label: 'Symbol', pass: /[^A-Za-z0-9]/.test(newPassword) },
                          ].map(r => (
                            <div key={r.label} className={`flex items-center gap-1 text-xs ${r.pass ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`}>
                              <div className={`w-1.5 h-1.5 rounded-full ${r.pass ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'}`} />
                              {r.label}
                            </div>
                          ))}
                        </div>
                        {strength > 0 && (
                          <span className={`text-xs font-semibold ${strength >= 3 ? 'text-emerald-600' : strength === 2 ? 'text-amber-600' : 'text-red-500'}`}>
                            {strengthLabels[strength - 1]}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                  <InputPassword name="Confirm new password" textType="text" passwordType="password" placeholder="Confirm your password" value={confirmNewPassword} setValue={setConfirmNewPassword}/>
                </div>
                {confirmNewPassword && !passwordsMatch && (
                  <p className="text-xs p-1.5 text-red-500">Password don't match</p>
                )}
                {passwordsMatch && (
                  <div className="flex items-center gap-2 text-xs text-emerald-600 p-1.5">
                    <CheckCircle size={12}/>
                    <p>Password match</p>
                  </div>
                )}
                <button disabled={!newPassword || !confirmNewPassword} onClick={() => setStep("done")} className="disabled:opacity-50 disabled:cursor-not-allowed mt-3 w-full text-sm text-white py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 cursor-pointer">Reset password</button>
              </div>
            </div>
          </section>
        : <section className="max-w-sm space-y-6">
            <div className="flex justify-center">
              <div className="bg-emerald-500 text-white p-3 rounded-full inline-flex">
                <CircleCheckBig size={40}/>
              </div>
            </div>
            <div className="text-center space-y-2">
              <h1 className="text-black text-3xl font-bold">Password reset!</h1>
              <p className="text-gray-600">Your password has been successfully reset.</p>
              <p className="text-sm text-gray-400">You can now sign in to your JobTrackr account with your new password.</p>
            </div>
            <div className="text-xs border border-amber-100 bg-amber-50 p-3 rounded-xl text-amber-700 space-y-0.5 flex gap-2">
              <ShieldCheck size={16}/>
              <div>
                <h3 className="font-semibold">Security reminder</h3>
                <p>All other active sessions have been signed out for your security</p>
              </div>
            </div>
            <Link to="/auth/login">
              <button className="bg-indigo-500 text-white w-full py-2 rounded-xl text-sm cursor-pointer hover:bg-indigo-400">Sign in with new password</button>
            </Link>
            <div className="text-gray-400 text-xs text-center mt-4">Need help? <span className="text-indigo-500 font-semibold">Contact support</span></div>
          </section>
        }
      </div>
      
    </main>
  )
}
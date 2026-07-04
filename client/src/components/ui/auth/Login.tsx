import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, useAuthContext } from "../../../hook/useAuth";
import Input from "../../common/Input";
import InputPassword from "../../common/InputPassword";
import { googleLogin } from "../../../service/authService";

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (options: {
            client_id: string;
            callback: (response: { credential?: string }) => void;
          }) => void;
          renderButton: (
            element: HTMLElement | null,
            options: { theme: string; size: string; width: number }
          ) => void;
        };
      };
    };
  }
}

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const googleButtonRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const { handleLoginSubmit } = useAuth();
  const { fetchUser } = useAuthContext();

  useEffect(() => {
    const buttonElement = googleButtonRef.current;

    if (!window.google || !buttonElement || !import.meta.env.VITE_GOOGLE_CLIENT_ID) {
      return;
    }

    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: async (response) => {
        try {
          if (!response.credential) throw new Error("No Google credential returned");

          await googleLogin({ credential: response.credential });
          await fetchUser();
          navigate("/dashboard");
        } catch (err) {
          console.error("Google login failed:", err);
          setError("Google sign-in failed");
        }
      },
    });

    window.google.accounts.id.renderButton(buttonElement, {
      theme: "outline",
      size: "large",
      width: 320,
    });
  }, [fetchUser, navigate]);

  const loginData = {
    email,
    password,
  };

  return (
    <main className="bg-white flex items-center justify-center p-8">
      <div className="w-full max-w-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Welcome Back</h1>
          <p className="text-sm text-gray-600 mt-1">
            Sign in to your JobTrackr account
          </p>
        </div>

        <div ref={googleButtonRef} className="mt-6 flex justify-center" />

        {error && <p className="text-sm text-red-500 mt-2">{error}</p>}

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-300"></span>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500 text-xs">
              Or continue with email
            </span>
          </div>
        </div>

        <form className="space-y-4">
          <Input
            name="Email Address"
            type="email"
            placeholder="example@gmail.com"
            value={email}
            setValue={setEmail}
          />
          <InputPassword
            name="Password"
            passwordType="password"
            textType="text"
            placeholder="••••••••"
            value={password}
            setValue={setPassword}
          />

          <div className="flex justify-end">
            <div className="text-xs text-indigo-600 text-right mt-1">
              <Link
                to="/auth/forgot-password"
                className="text-indigo-600 hover:text-indigo-500 font-medium"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              handleLoginSubmit(loginData);
            }}
            className="w-full bg-indigo-600 text-white text-sm font-medium py-2 px-4 rounded-xl hover:bg-indigo-700 transition-colors duration-300"
          >
            Sign In
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-6 text-center">
          Don't have an account?{" "}
          <Link
            to="/auth/register"
            className="text-indigo-600 hover:text-indigo-500 font-medium"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </main>
  );
}
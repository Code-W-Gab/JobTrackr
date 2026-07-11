import { useEffect, useState } from "react";
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
          prompt: () => void;
        };
      };
    };
  }
}

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [googleError, setGoogleError] = useState<string>("");
  const navigate = useNavigate();
  const { handleLoginSubmit, errors } = useAuth();
  const { fetchUser } = useAuthContext();

  useEffect(() => {
    if (!window.google || !import.meta.env.VITE_GOOGLE_CLIENT_ID) {
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
          setGoogleError("Google sign-in failed");
        }
      },
    });
  }, [fetchUser, navigate]);

  const handleGoogleLogin = () => {
    if (!window.google?.accounts?.id) {
      setGoogleError("Google sign-in is not available right now.");
      return;
    }

    window.google.accounts.id.prompt();
  };

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

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white py-3 px-4 text-sm font-medium text-gray-700 transition duration-300 hover:bg-gray-50 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            className="h-5 w-5"
          >
            <path
              fill="#FFC107"
              d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20c11.045 0 20-8.955 20-20 0-1.341-.138-2.65-.389-3.917z"
            />
            <path
              fill="#FF3D00"
              d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
            />
            <path
              fill="#4CAF50"
              d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
            />
            <path
              fill="#1976D2"
              d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.002-.001 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        {googleError && <p className="text-sm text-red-500 mt-2">{googleError}</p>}

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
            error={errors.email}
          />
          <InputPassword
            name="Password"
            passwordType="password"
            textType="text"
            placeholder="••••••••"
            value={password}
            setValue={setPassword}
            error={errors.password}
          />

          {errors.general && <div className="bg-red-100 border border-red-400 text-red-600 text-sm px-2 py-1 rounded-sm">{errors.general}</div>}

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
            type="button"
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
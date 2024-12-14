import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import clsx from "clsx";
import Navbar from "./Navbar";
import { useRouter } from 'next/router';
import { connect } from "../reducers/user";



function Login() {

  const user = useSelector((state) => state.user.value);
  const [email, setemail] = useState("");
  const [emailError, setEmailError] = useState(true);
  const [password, setPassword] = useState("");
  const [signState, setsignState] = useState("Sign In"); //Pour modifier les titres selon l'inscription/connexion
  const [buttonPressed, setButtonPressed] = useState(false);

  const dispatch = useDispatch()
  const router = useRouter()

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (signState === "Sign In") {
        handleSignIn();
      } else {
        handleSignUp();
      }
    }
  };

  useEffect(() => {
    if (buttonPressed) {
      setTimeout(() => {
        setButtonPressed(false);
      }, 300);
    }
  }, [buttonPressed]);

  const handleSignUp = () => {
    if (EMAIL_REGEX.test(email)) {
      fetch("http://localhost:3000/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            dispatch(connect({ token: data.data.token, email }));
            router.push("/")
          }
        });
    } else {
      setEmailError(false);
      toast.error(`Error try again`);
    }
  };

  const handleSignIn = () => {
    fetch("http://localhost:3000/users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(
            connect({
              token: data.token,
              email: data.email,
            })
          );
          toast.success(`Welcome Back ${data.email}`);
          router.push("/")
        } else {
          setEmailError(false);
          toast.error(`Error try again`);
        }
      });
  };

  const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return (
    <div className="h-screen">
      <Navbar />
      <div className="bg-gray-100 flex justify-center items-center h-5/6">
        <div className="lg:p-36 md:p-52 sm:20  w-full h-full lg:w-1/2">
          <h1 className="text-2xl font-semibold text-center font-serif mb-4">
            {signState}
          </h1>

          <div className="mb-4">
            <label for="email" className="block text-gray-600">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autoComplete="off"
              onChange={(e) => setemail(e.target.value)}
              value={email}
              placeholder="Type your Email"
              onKeyDown={handleKeyDown}
            />
            {!emailError && (
              <p className="text-red-600">Invalid email address</p>
            )}
          </div>

          <div className="mb-4">
            <label for="password" className="block text-gray-600">
              Password
            </label>

            <input
              type="password"
              id="password"
              name="password"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autoComplete="off"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Type your Password"
              onKeyDown={handleKeyDown}
            ></input>
          </div>

          <button
            onClick={() => {
              signState === "Sign In" ? handleSignIn() : handleSignUp();
              setButtonPressed(true);
            }}
            className={clsx(
              buttonPressed
                ? "bg-[#010203] text-[#bfdbf7]"
                : "bg-[#bfdbf7] text-[#010203]",
              " font-semibold rounded-md py-2 px-4 w-full"
            )}
          >
            {signState}
          </button>

          <div className="mt-6 text-blue-500 text-center">
            <div>
              {signState === "Sign In" ? (
                <p className="text-[#010203]">
                  New member?{" "}
                  <button
                    className="hover:underline text-blue-600"
                    onClick={() => {
                      setsignState("Sign Up");
                    }}
                  >
                    Sign Up now
                  </button>
                </p>
              ) : (
                <p>
                  <span className="text-slate-950">
                    Already have an account ?{" "}
                  </span>
                  <button
                    className="hover:underline"
                    onClick={() => {
                      setsignState("Sign In");
                    }}
                  >
                    Sign In now
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="w-1/2 h-full hidden lg:block bg-cover">
          <img className=" w-full h-full object-cover object-center" src="logsky.jpg" />
        </div>
      </div>
    </div>
  );
}

export default Login
import React from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../reducers/user";
import { reRender} from "../reducers/render";
import { changeCity, changeTemp } from "../reducers/city";
import { useState } from "react";

function Navbar() {

  const dispatch = useDispatch();
  const router = useRouter();

  const user = useSelector((state) => state.user.value);
  const [city, setCity] = useState("");

  const handleHome = () => {
    router.push("/");
  };

  const handleLogin = () => {
    router.push("/log");
  };

  const handleLogout = () => {
    dispatch(logout())
    dispatch(reRender())
  }

  // push dans user.cities[] et crée une nouvelle City en BDD
  const handleSearch = () => {
    dispatch(changeCity(city))
    setCity("");
  };

  const handleChangeTemp = () => {
    dispatch(changeTemp())
  }

  const Logout = (
    <span className="cursor-pointer text-xl font-bold text-stone-100 font-serif" onClick={() => handleLogout()}>
            Logout
          </span>
  )

  const Login = (
    <span className="cursor-pointer text-xl font-bold text-stone-100 font-serif" onClick={() => handleLogin()}>
            Login
          </span>
  )

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="h-1/6 flex items-center border-b-4 border-black  bg-[#000A14] justify-around">
      <div>
        <span className="cursor-pointer text-stone-100 text-3xl font-bold font-serif" onClick={() => handleHome()}>
          Weather Center
        </span>
      </div>

    {router.pathname === "/" && 
        <>
          <div className="flex gap-5">
          <div className="w-3/4 border-2 rounded-md">   
                <label  for="search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-stone-100">Search</label>
                <div class="relative">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500 dark:text-stone-100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input value={city} onChange={(e) => setCity(e.target.value)} onKeyDown={handleKeyDown}  type="search"  id="search" class="block w-full p-4 ps-10 text-sm text-gray-900 border-2 border-stone-100 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"  placeholder="Search" required />
                    <button onClick={() => handleSearch()} type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-[#bfdbf7] focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 ">Search</button>
                </div>
            </div>

              
      <label class="inline-flex items-center cursor-pointer">
            <input type="checkbox" onClick={()=> handleChangeTemp()} value="" class="sr-only peer"/>
            <div class="relative w-12 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-500 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span class="ms-3 font-serif text-gray-900 dark:text-neutral-200 text-center">Change Scale</span>
        </label>

      </div>


      <div>
      {user?.token ? 
        Logout    : 
        Login
      }
    </div>
    </>
      }

  

    </div>
  );
}

export default Navbar;

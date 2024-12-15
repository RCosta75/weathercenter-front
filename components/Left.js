import React from "react";
import { useEffect, useState } from "react";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { reRender } from "../reducers/render";
import { Modal } from 'antd';
import { useRouter } from "next/router";


function Left() {

  const dispatch = useDispatch()
  const router = useRouter()

  const temp = useSelector((state) => state.city.temp);
  const render = useSelector((state) => state.render.value.isUpdated);
  const user = useSelector((state) => state.user.value);

  const [cityData, setCityData] = useState([]);
  const [city,setCity] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Route pour actualiser les temperatures
  useEffect(() => {
    if (user.token) {
      fetch(`http://localhost:3000/users/cities/${user.token}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.cities) {
            setCityData(data.cities);
          }
        });
    }
  }, [user.token, render]);

  const handleSearch = () => {
    if (user.token) {
      fetch(`http://localhost:3000/weather/newpost`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: user.token,
          cityName: city,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result === true) {
            dispatch(reRender());
          } else {
            console.log("ERROR");
          }
        });
    } else{
      setIsModalOpen(true)
    }

    setCity("");
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && user.token) {
      handleSearch();
    } else if (event.key === "Enter" && !user.token) {
      setIsModalOpen(true)
    }
  };

  const villeCel = cityData?.map((e, i) => {
    return <Card key={i} {...e} temp={temp} />;
  });
  

  const celsiusToFahrenheit = (celsius) => (celsius * 9) / 5 + 32;

  const villeFar = cityData?.map((e, i) => {
    // Conversion des températures
    const tempF = celsiusToFahrenheit(e.degrees).toFixed(2);

    return <Card key={i} {...e} degrees={tempF} temp={temp}  />;
  });

  return (

    <div className="w-1/5 bg-[#000A14] overflow-y-auto overflow-auto justify-center flex-wrap">

      <div className="flex flex-col items-center justify-center pt-5 gap-5">

        <h1 className="text-stone-100 font-serif text-3xl font-bold text-center">Save a City</h1>

            <div className="w-3/4 border-2 border-stone-100 rounded-lg">   
                <label  for="search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Save</label>
                <div class="relative">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input value={city} onChange={(e) => setCity(e.target.value)} onKeyDown={handleKeyDown}  type="search"  id="search" class="block w-full p-4 ps-10 text-sm text-gray-900 border-2 border-stone-100 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"  placeholder="Search" required />
                    <button onClick={() => handleSearch()} type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-[#bfdbf7] focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 ">Search</button>
                </div>
            </div>
        
        <Modal 
          open={isModalOpen} 
          onOk={handleOk} 
          onCancel={handleCancel}
          footer={null}
          closeIcon={null}
          maskClosable={true}>
          <p onClick={() => router.push('/log')} className="hover:underline cursor-pointer text-center font-serif text-xl text-red-700">Please Login To Save a City</p>
        </Modal>

      </div>

      <div className="flex flex-col flex-wrap py-5 gap-5 justify-center items-center">
      
      {user.token ? (temp ? villeCel : villeFar) : <></>}

      </div>
      
    </div>
  );
}

export default Left;

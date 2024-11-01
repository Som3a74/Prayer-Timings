import React, { useEffect, useState } from 'react'

export default function Prayer({ readable, city, data }) {
  const [pray, setpray] = useState(null)
  const [sec, setsec] = useState(60)
  const [min, setmin] = useState(60)
  const [hou, sethou] = useState(24)

  //get current time 
  const d = new Date();
  let hour = d.getHours();
  // let minute = d.getMinutes();
  let secound = d.getSeconds();

  // function get next pray and  compare between it and  current time
  function fun_compareTime() {
    let findIt = false;
    for (let i = 0; i < data.length; i++) {
      if (data[i].time.split(':')[0] >= hour) {
        findIt = true;
        setpray(data[i])
        setsec(60 - secound)
        setmin(60 - data[i].time.split(':')[1])
        sethou((data[i].time.split(':')[0]) - hour)
        break;
      }
    }
    if (!findIt) {
      setsec(60 - secound)
      setmin(60 - data[0].time.split(':')[1])
      // i have bug because system of current time = 24 and praytime = 12  
      if (hour >= data[4].time.split(':')[0] && hour > 6) {
        sethou(hour - (+data[0].time.split(':')[0] + 12))
      } else {
        sethou((+data[0].time.split(':')[0]) - hour)
      }
      setpray(data[0])
    }
  }


  useEffect(() => {
    fun_compareTime()
  }, [data])

  // function to make time play
  useEffect(() => {
    let time = setInterval(() => {
      setsec((c) => c - 1)
    }, 1000);
    return () => {
      clearTimeout(time)
    } 
  }, [setsec])

return <>

  <section className='mt-5 mx-5 p-6 bg-gradient-to-r from-main-green to-secound-green rounded-full'>
    <div className='container'>
      <div className='flex flex-wrap justify-center items-center text-center'>

        {pray !== null &&
          <div className='flex-1'>
            <h2 className='text-white font-bold'>الوقت المتبقي علي صلاة  {pray.name} </h2>
            <p className='text-white font-bold'>{min >= 0 ? hou : setmin((h) => h - 1)} : {sec >= 0 ? min : setmin((m) => m - 1)} : {sec >= 0 ? sec : setsec(60)} </p>
          </div>
        }

        <div className='flex-1'>
          <span className='text-white font-bold'>{readable}</span>
          <h3 className='text-white font-breadableold'>{city}</h3>
        </div>

      </div>
    </div>
  </section>
  
</>
}

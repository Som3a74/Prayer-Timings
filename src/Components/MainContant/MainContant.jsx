import React, { useEffect, useMemo, useState } from 'react'
import axios from 'axios';
import Prayer from './../Prayer/Prayer';

import img_fjer from '../../Img/Al_fgr.png'
import img_dohr from '../../Img/Al_dohr.png'
import img_3sr from '../../Img/Al_3sr.png'
import img_Mhrb from '../../Img/Al_Mhrb.png'
import img_3sha from '../../Img/Al_3sha.png'



export default function MainContant() {
    const [data, setdata] = useState(null)
    const [readable, setreadable] = useState(null)
    const [city, setcity] = useState({ 'country': 'EGY', "name": 'القاهره', "apiName": 'Cairo' })
    const [country, setcountry] = useState([
        { 'country': 'EGY', "name": 'القاهره', "apiName": 'Cairo' },
        { 'country': 'EGY', "name": 'الشرقيه', "apiName": 'Alsharqiya' },
        { 'country': 'EGY', "name": 'اسكندريه', "apiName": 'Alexandria' },
    ])

    async function fun_getData(country = 'EGY', apiName = 'Cairo') {
        try {
            const { data } = await axios.get(`https://api.aladhan.com/v1/timingsByCity/:date?country=${country}&city=${apiName}`)
            console.log(data.data);
            const PrayerTime = [
                { "name": 'الفجر', "time": data.data.timings.Fajr, 'img': img_fjer },
                { "name": 'الضهر', "time": data.data.timings.Dhuhr, 'img': img_dohr },
                { "name": 'العصر', "time": data.data.timings.Asr, 'img': img_3sr },
                { "name": 'المغرب', "time": data.data.timings.Maghrib, 'img': img_Mhrb },
                { "name": 'العشاء', "time": data.data.timings.Isha, 'img': img_3sha },
            ]
            setdata(PrayerTime)
            setreadable(data.data.date.readable)
        } catch {
            return console.log('erorr');;
        }
    }

    const obj_countrys = {
        'EGY': [
            { 'country': 'EGY', "name": 'القاهره', "apiName": 'Cairo' },
            { 'country': 'EGY', "name": 'الشرقيه', "apiName": 'Alsharqiya' },
            { 'country': 'EGY', "name": 'اسكندريه', "apiName": 'Alexandria' },
        ],
        'SUA': [
            { 'country': 'SUA', "name": 'مكه', "apiName": 'Mecca' },
            { 'country': 'SUA', "name": 'الشارقه', "apiName": 'Shaqra' },
            { 'country': 'SUA', "name": 'الدمام', "apiName": 'Dammam' },
        ]
    };

    function fun_getCity(value) {
        for (let i = 0; i < country.length; i++) {
            if (country[i].apiName === value) {
                console.log(country[i]);
                setcity(country[i])
                fun_getData(country[i].country, country[i].apiName)
            }
        }
    }

    function fun_getCountry(value) {
        if (value == 'SUA') {
            console.log(obj_countrys.SUA)
            setcountry(obj_countrys.SUA)
        } else {
            console.log(obj_countrys.EGY)
            setcountry(obj_countrys.EGY)
        }
    }

    const child = useMemo(() => <Prayer readable={readable} data={data} city={city.name} />, [readable, city, setdata])

    useEffect(() => {
        fun_getData()
    }, [])

return <>

{data !== null &&
    <>
        {child}

        <article className='flex justify-evenly  mt-2 p-10'>
            <div className='text-center'>
                <label htmlFor="HeadlineAct" className="block text-gray-900 font-bold text-xl mb-2">المدينه</label>
                <select onChange={(e) => fun_getCity(e.target.value)} name="HeadlineAct" id="HeadlineAct" className="w-6/6 rounded-lg  p-5 text-lg border-2">
                    {country.map((ele, index) =>
                        <option key={index} className='font-bold' value={ele.apiName}>{ele.name}</option>
                    )}
                </select>
            </div>

            <div className='text-center'>
                <label htmlFor="Headlincountry" className="block text-gray-900 font-bold text-xl mb-2">الدوله</label>
                <select onChange={(e) => fun_getCountry(e.target.value)} name="Headlincountry" id="Headlincountry" className=" w-6/6 rounded-lg p-5 text-lg border-2">
                    <option className='font-bold text-lg' value="EGY">مصر</option>
                    <option className='font-bold text-lg' value="SUA">السعوديه</option>
                </select>
            </div>
        </article>



        <main className='mt-2 py-7'>
            <div className='flex flex-wrap items-center justify-center text-center'>
                {data.map((ele, index) =>
                    <div key={index} className="w-72 m-1 rounded-lg p-2 shadow-lg shadow-white bg-main-green">
                        <div>
                            <img loading={'lazy'} className='rounded-md' alt={ele.name} src={ele.img} />
                        </div>
                        <div>
                            <h3 className="font-bold text-2xl mb-5 text-white">{ele.name}</h3>
                            <h4 className="font-medium text-2xl text-gray-100 ">{ele.time}</h4>
                        </div>
                    </div>
                )}
            </div>
        </main>

    </>
}
</>
}

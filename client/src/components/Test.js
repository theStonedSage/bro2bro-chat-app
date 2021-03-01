import React, { useEffect, useState } from 'react'

const Test = () => {
    console.log('start')
    const [name,setName] = useState('');
    const [arr,setArr] = useState([4,5]);
    const sampleArr = [1,2,3];
    const [a,seta] = useState(false);
    console.log(name);
    
    useEffect(()=>{
        console.log('logging',a);
    },[a])

    useEffect(()=>{
        console.log('logging arr',arr);
    },[arr])

    const check = (e)=>{
        setName(e.target.value);
        console.log('fwd');
        setArr((a)=>([...a,...sampleArr]));
        seta(true);
    }


    console.log('end');
    return (
        <div>
            <input onChange={check} />
            {a&&<h1>see</h1>}
        </div>
    )
    
}

export default Test

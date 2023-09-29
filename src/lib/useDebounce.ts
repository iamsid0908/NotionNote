import React from 'react'

export function useDebounce(value:string, delay:number){
    const[debouncedvalue, setDebouncevalue] = React.useState("");

    React.useEffect(()=>{
        const handle = setTimeout(()=>{
            setDebouncevalue(value);
        },delay)
        return ()=>{
            clearTimeout(handle);
        }
    },[value, delay]);
    return debouncedvalue;
}
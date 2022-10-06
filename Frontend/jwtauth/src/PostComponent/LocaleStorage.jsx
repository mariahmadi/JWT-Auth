import React, { useState, useEffect, useMemo } from "react";

const useLocaleStorage = (key, defaultValue = null) => {
    const [value, setValue] = useState(() => {



        try {
            const saved = window.localStorage.getItem(key)

            if (saved ) {
                return JSON.parse(saved)
            } else {
              //  window.localStorage.setItem(key, JSON.stringify(defaultValue))
                return defaultValue

            }

        }
        catch (error) {
            return defaultValue
        }
    })
    // useEffect(() => {
    //  setnewValue()
    // }, [value,key])

    const setnewValue = (newValue) => {
        try {
            window.localStorage.setItem(key, JSON.stringify(newValue))
        } catch (error) { }
        setValue(newValue)

    }
    
    useEffect(() => {
        const rawValue = JSON.stringify(value);
        localStorage.setItem(key, rawValue);
    }, [key, value]);
    

    return [value, setnewValue]
}
export default useLocaleStorage
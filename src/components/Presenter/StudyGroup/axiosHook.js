import axios from "axios";
import { useState, useEffect } from "react";

export default function useAxios(url) {
    const [data , setData] = useState(null);

    useEffect(() => {
        axios.get(url)
        .then((response) => {
            setData(response.data)
        })
    }, []);



    return {data,setData};
}
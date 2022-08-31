//creating custom hook to fetch data
import axios from "axios";
import { useState, useEffect } from "react";

const useFetch = (url) => {
    //1.
    const [data, setData] = useState([]);
    //2.
    const [loading, setLoading] = useState(false);
    //3.
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await axios.get(url);
                setData(res.data);
            } catch (err) {
                setError(err);
            }
            setLoading(false);
        };
        fetchData();
    }, []);


    const reFetch = async () => {
        setLoading(true);
        try {
            const res = await axios.get(url);
            setData(res.data);
        } catch (err) {
            setError(err);
        }
        setLoading(false);
    };
    return { data, loading, error, reFetch };
};

export default useFetch;
import { useState, useEffect } from "react";
import axios from "axios";

export interface ReturnedData<T> {
    data? : T;
    error? : string;
    loading: boolean;
}

export const useAxiosGet = <FetchedData>(url: string): ReturnedData<FetchedData> => {
    
    axios.defaults.baseURL = 'localhost:3000';
    
    const [fetchedData, setFetchedData] = useState<ReturnedData<FetchedData>>({loading: true})
    useEffect(() =>{
        const controller = new AbortController();
        const fetchData = async () => {
            
            try {
                const response = await axios.get(url,{signal: controller.signal})
                setFetchedData({data: response.data, loading: false})
                
            } catch (error) {
                setFetchedData({error: "could not load data", loading: false})
            }

        }
        fetchData();

        return () => {
            controller.abort();
        }
    }, [url])

    return fetchedData
}
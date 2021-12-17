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

export interface AxiosPostOptions<T> {
    body: T;
}

export const useAxiosPost = <PostDataType>(url: string) => {
    
    axios.defaults.baseURL = 'localhost:3000';
    const [options, setOptions] = useState<AxiosPostOptions<PostDataType>>();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    
    const postData = (postData: PostDataType) => {
        setOptions({body: postData})
    }

    useEffect(() => {
        const controller = new AbortController();
        const postData = async () => {
            if (!options) { return; }
            try {
                console.log(url)
                const response = await axios.post(url, options.body);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                setError("Could not save data");
            }
        }

        postData();

        return () => {
            controller.abort();
        }
    }, [url, options])

    return {isLoading, error, postData}
}
import { useState, useEffect } from "react";
import axios from "axios";

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
                const response = await axios.post(url, options.body, {signal: controller.signal});
                setIsLoading(false);
                console.log(response);
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


export interface AxiosConfig<D> {
    method?: 'get' | 'post' | 'delete' | 'put';
    url: string;
    data?: D;
    params?: URLSearchParams;
}

export const useAxios = <T, D = undefined >(config: AxiosConfig<D>) => {
    
    const [responseData, setResponseData] = useState<T>();
    const [isLoading, setIsloading] = useState(true);
    const [isError, setIsError] = useState(false);


    useEffect(() => {
        const controller = new AbortController();
        const axiosRequest = async () => {
            try {
                const response = await axios({ ...config, signal: controller.signal })
                setResponseData(response.data)
                setIsloading(false);
            } catch (error) {

                setIsError(true);
                setIsloading(false);
            }
        }

        axiosRequest();

        return () => {
            controller.abort();
        }
    }, [config.url])

    return {responseData, isLoading, isError}
}

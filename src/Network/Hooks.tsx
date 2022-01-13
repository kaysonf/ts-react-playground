import {useCallback, useState} from "react";

type HttpHook<ResponseBody> = { data: ResponseBody | null; error: string | null; loading: boolean }

export function useGetApi<ResponseBody>(url: string): [HttpHook<ResponseBody>, () => Promise<ResponseBody>] {
    const [data, setData] = useState<ResponseBody | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const makeRequest = useCallback(
        () => {
            return new Promise<ResponseBody>((resolve, reject) => {
                if (!url) reject('url empty');

                setLoading(true);

                fetch(url, {method: 'GET'})
                    .then(data => data.json())

                    .then(data => {
                        setData(data);
                        resolve(data);
                    })

                    .catch(err => {
                        setError(err);
                        reject(err);
                    })

                    .finally(() => setLoading(false))
            })

        }, [setLoading, setError, setData, url]);

    return [{data, error, loading}, makeRequest];
}

export function usePostApi<RequestBody, ResponseBody>(url: string): [HttpHook<ResponseBody>, (requestBody: RequestBody) => Promise<ResponseBody>] {
    const [data, setData] = useState<ResponseBody | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const makeRequest = useCallback(
        (requestBody: RequestBody) => {
            return new Promise<ResponseBody>((resolve, reject) => {
                if (!url) return;
                setLoading(true);

                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestBody)
                })
                    .then(data => data.json())

                    .then(data => {
                        setData(data);
                        resolve(data);
                    })

                    .catch(err => {
                        setError(err);
                        reject(err);
                    })

                    .finally(() => setLoading(false))
            })

        }, [setLoading, setError, setData, url]);

    return [{data, error, loading}, makeRequest];
}
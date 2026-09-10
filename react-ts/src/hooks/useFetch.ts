import { useState, useEffect } from "react";


// Generic type: the hook can work with any response data type
interface FetchState<T> {
    data: T | null;
    loading: boolean;
    error: string | null 
}


// T is determined by whoever uses the hook
export function useFetch<T>(url: string): FetchState<T> {
    const [state, setState] = useState<FetchState<T>> ({
        data: null,
        loading: true,
        error: null
    });

    // useEffect to make fetch request

    return state
}
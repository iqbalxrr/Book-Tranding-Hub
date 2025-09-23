import axios from 'axios';
import React from 'react';


const axiosInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`
})

const baseUrl = () => {
    return axiosInstance
}

export default baseUrl;
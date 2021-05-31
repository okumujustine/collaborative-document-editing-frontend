import axios from 'axios'
import { config } from '../constants/constants'

export const ApiInstance = axios.create({
    baseURL: config.url.baseURL,
    timeout: 30000
});
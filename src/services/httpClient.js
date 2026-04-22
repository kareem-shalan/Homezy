import axios from 'axios'

const httpClient = axios.create({
  baseURL: '/api',
  timeout: 6000,
})

export default httpClient

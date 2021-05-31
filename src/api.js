import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://platform.livpoc.com:8081',
})

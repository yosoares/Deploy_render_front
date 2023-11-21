import axios from 'axios'

const apiLocal = axios.create({
    baseURL: 'https://node-deploy-senac-1gu8.onrender.com'
})

export default apiLocal
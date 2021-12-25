import axios from 'axios';

const baseUrl = 'https://site202129.tw.cs.unibo.it';
const logUrl = baseUrl + 'api/auth/login/users';

const standardHeaders = {
    'Content-Type': 'text/plain',
    'mode': 'cors'
};

const advancedHeaders = {
    ...standardHeaders,
    'authority': JSON.stringify(localStorage['accessToken'])
};

async function login(username: string, password: string){
    try {
        const response =  await axios.post(logUrl, {username, password}, { data: {standardHeaders} })
        const accessToken = response.data.authority
        return { accessToken }
    } catch (err: any) {
        return { error: err.response.data.message }
    }
};

export { login };
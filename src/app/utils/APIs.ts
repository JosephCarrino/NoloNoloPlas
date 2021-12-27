import axios from 'axios';
import jwt_decode from 'jwt-decode';

const baseUrl = 'https://site202129.tw.cs.unibo.it/';
const logUrl = baseUrl + 'api/auth/login/users';
const getUserUrl = baseUrl + 'api/users/';
const patchUserUrl = baseUrl + 'api/users/';

const standardHeaders = {
    'Content-Type': 'text/plain',
    'mode': 'cors'
};

const advancedHeaders = {
    ...standardHeaders,
    'authority': JSON.stringify(localStorage['accessToken'])
};

function generateAdvancedHeaders(){
    let myObj: any = jwt_decode(localStorage['accessToken']);
    console.log(myObj)
    return myObj.auth;
}

async function login(username: string, password: string){
    try {
        const response =  await axios.post(logUrl, {username, password}, { data: {standardHeaders} })
        const accessToken = response.data.authority
        return { accessToken }
    } catch (err: any) {
        return { error: err.response.data.message }
    }
};

export async function getUserInfo(id: string){
    try{
        const response = await axios.get(getUserUrl + id, { headers: {...advancedHeaders}});
        return(response);
    } catch (err: any){
        return { error: err.response.data.message}
    }
}

export async function patchUser(id: string, patched: any){
    try{
        console.log(patched);
        const response = await axios.patch(patchUserUrl + id, patched, { headers: {...advancedHeaders}});
        console.log(response);
        if(response.status === 200)
            return true;
        else
            return false;
    } catch (err: any){
        return false;
    }
}

export { login };
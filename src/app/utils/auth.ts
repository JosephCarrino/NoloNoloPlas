import { JwtHelperService } from "@auth0/angular-jwt";
import { checkValidity } from './verifier.js';


const jwt = new JwtHelperService();
const DOMAIN =  '//site202129.tw.cs.unibo.it';
const BASE_URL = '//site202129.tw.cs.unibo.it/api/auth';
const LOGIN_URL = BASE_URL + '/login/users';
const REGISTER_URL = DOMAIN + '/api/users';
const PUBLICKEY_URL = BASE_URL + '/publicKey';
const ACCESS_TOKEN_STORAGE = 'accessToken';
const PUBLIC_KEY_STORAGE = 'publickey';

export async function login(username: string, password: string){
    try{
        let res: any = await fetch(LOGIN_URL, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({username, password})
        });
        let status = res.status;
        res = await res.json();
        if(status === 200){
            setToken(res.authority);
        }       
    } catch (e) {
        console.error(e);
    }
}

interface regForm {
    name: string;
    surname: string;
    username: string;
    password: string;
    paymentmethod: string;
    residence: string;
    avatar: string;
}

export async function register(data: regForm){
    try{
        let res: any = await fetch(REGISTER_URL,  {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(data)
        });
        let status = res.status;
        res = await res.json();
        if(status === 200){
            return true;
        } else {
            return false;
        }
    } catch(e) {
        console.error(e);
        return false;
    }
}

export function setToken(token: string){
    localStorage[ACCESS_TOKEN_STORAGE] = token
}

export function getToken(){
    return localStorage[ACCESS_TOKEN_STORAGE]
}

async function getPubKey(){
    if(!localStorage[PUBLIC_KEY_STORAGE] || typeof localStorage[PUBLIC_KEY_STORAGE] === undefined || localStorage[PUBLIC_KEY_STORAGE] === 'undefined'){
        let res: any = await fetch(PUBLICKEY_URL, {
            method: 'GET',
            mode: 'cors',
            headers: { 'Access-Control-Allow-Origin': '*'}
        });
        let status = res.status;
        res = await res.json();
        if (status === 200){
            localStorage[PUBLIC_KEY_STORAGE] = res.publicKey;
        }
    }
    return localStorage[PUBLIC_KEY_STORAGE];
}

export function isLoggedIn(){
    try{
        if (!localStorage[ACCESS_TOKEN_STORAGE] || typeof localStorage[ACCESS_TOKEN_STORAGE] === undefined || localStorage[ACCESS_TOKEN_STORAGE] === 'undefined' || !checkValidity)
            return false;
        else
            return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}
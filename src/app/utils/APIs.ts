import axios from 'axios';
import jwt_decode from 'jwt-decode';

const baseUrl = 'https://site202129.tw.cs.unibo.it/';
const logUrl = baseUrl + 'api/auth/login/users';
const getUserUrl = baseUrl + 'api/users/';
const patchUserUrl = baseUrl + 'api/users/';
const getArticleUrl = baseUrl + 'api/articles/';
const getPaymentUrl = baseUrl + 'api/paymentMethods/';
const getRentalUrl = baseUrl + 'api/rentals/';
const getCategoriesUrl = baseUrl + 'api/articles/category';
const getSuggestedUrl = baseUrl + 'api/articles/suggested/';
const patchSuggestedUrl = baseUrl + 'api/rentals/suggested/';
const getAvailablesUrl = baseUrl + 'api/articles/availables';

const standardHeaders = {
    'Content-Type': 'application/json',
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

export async function register(regForm: any){
    try {
        const response =  await axios.post(getUserUrl, regForm, { data: {standardHeaders} })
        if(response.status === 200)
            return true;
        else
            return false;
    } catch (err: any) {
        return false;
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
        const response = await axios.patch(patchUserUrl + id, patched, { headers: {...advancedHeaders, }});
        if(response.status === 200)
            return true;
        else
            return false;
    } catch (err: any){
        return false;
    }
}


export async function patchRental(id: string, patched: any){
    try{
        const response = await axios.patch(getRentalUrl + id, patched, { headers: {...advancedHeaders}});
        if(response.status === 200)
            return true;
        else
            return false;
    } catch (err: any){
        return false;
    }
}

export async function getRentals(id: string, queries: any){
    try{
        let url = patchUserUrl + id + "/rentals";
        let first= 0;
        if(queries){
            for(let field in queries){
                if(field == 'date_start')
                    first= 0;
                else if(field == 'date_end')
                    first= 1;
                else if(field == 'state')
                    first= 2;
            }
            url+='?';
            if(queries.date_start) (first == 0) ? url+= 'date_start=' + queries.date_start : url+= '&date_start=' + queries.date_start ;
            if(queries.date_end) (first == 1) ? url+= 'date_end=' + queries.date_end : url+= '&end=' + queries.date_end;
            if(queries.state) (first ==  2) ?  url+='state=' + queries.state : url+='&state=' + queries.state;
            console.log(url);
        }
        const response = await axios.get(url, { headers: {...advancedHeaders} });
        if(response.status === 200)
            return response;
        else
            return false;
    } catch (err: any){
        return false;
    }
}

export async function getArticle(id: string){
    try{
        const response = await axios.get(getArticleUrl + id, { headers: {...advancedHeaders} });
        if(response.status === 200)
            return response;
        else
            return false;
    } catch (err: any){
        return false;
    }
}

export async function getPayment(){
    try{
        const response = await axios.get(getPaymentUrl, { data: {standardHeaders} })
        if(response.status === 200)
            return response.data;
        else
            return false;
    } catch (err: any){
        return false;
    }
}

export async function getRental(id: string){
    try{
        const response = await axios.get(getRentalUrl + id, {headers: {...advancedHeaders} });
        if(response.status === 200)
            return response;
        else
            return undefined;
    } catch (err: any){
        return undefined;
    }
}

export async function checkAvailability(id: string, date_start: string, date_end: string, rental: string= ''){
    try{
        let url: string = getArticleUrl + id + '/available?start=' + date_start + '&end=' + date_end;
        if(rental != '')
            url+= '&rental=' + rental;
        const response = await axios.get(url, {headers: {...advancedHeaders} });
        if(response.status === 200)
            return response.data;
        else
            return false;
    } catch (err:any){
        console.log(err);
        return false;
    }
}

export async function getArticles(){
    try{
        const response = await axios.get(getArticleUrl, {headers: {...advancedHeaders}});
        if(response.status === 200)
            return response.data;
        else
            return undefined;
    } catch (err:any){
        console.log(err);
        return false;
    }
}

export async function createRental(body: any){
    try{
        const response = await axios.post(getRentalUrl, body, {headers: {...advancedHeaders}});
        if(response.status === 200)
            return true;
        else
            return false;
    } catch (err:any){
        console.log(err);
        return false;
    }
}

export async function delRental(id: string){
    try{
        const response =  await axios.delete(getRentalUrl + id, {headers: {...advancedHeaders}});
        if(response.status === 200)
            return true;
        else
            return false;
    } catch (err:any){
        console.log(err);
        return false;
    }
}

export async function getCategories(){
    try{
        const response = await axios.get(getCategoriesUrl, {headers: {...advancedHeaders}});
        if(response.status === 200)
            return response.data;
        else
            return false;
    } catch (err: any){
        return false;
    }
}

export async function getSuggested(id: string, start: string, end: string){
    try{
        const response = await axios.get(getSuggestedUrl + id + "?start=" + start + "&end=" + end, {headers: {...advancedHeaders}});
        if(response.status === 200)
            return response.data;
        else
            return false;
    } catch (err: any){
        console.log(err);
        return false;
    }
}

export async function patchSuggested(id: string, newId: string){
    try{
        const response = await axios.patch(patchSuggestedUrl + id + "?article=" + newId, {}, {headers: {...advancedHeaders}});
        if(response.status === 200)
            return response.data;
        else
            return false;
    } catch (err: any){
        console.log(err);
        return false;
    }
}

export async function getAvailables(start: string, end: string){
    try{
        const response: any = await axios.get(getAvailablesUrl + "?start=" + start + "&end=" + end, {headers: {...advancedHeaders}});
        if(response.status === 200)
            return response.data.availables;
        else
            return false;
    } catch (err: any){
        console.log(err);
        return false;
    }
}

export { login };
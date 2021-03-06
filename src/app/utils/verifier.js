const jwt = require('jsonwebtoken');
const { getToken, getPubKey } = require('./auth.ts');

export async function checkValidity(){
    let decoded = await jwt.verify(getToken(), getPubKey(), {'algorithms': 'RS256'})
    if(decoded){
        localStorage.setItem('userID', decoded.id);
        return true;
    }
    else{
        return false;
    }
}


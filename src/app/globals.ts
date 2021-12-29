'use strict'

export var stateModify: string = '';
export var articleState: string= '';

export function setState(newId: string){
    stateModify= newId;
}

export function setArticle(newState: string){
    articleState= newState;
}
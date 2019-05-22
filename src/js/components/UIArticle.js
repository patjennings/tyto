// import * as globals from "./globals";
// import appState from "./globals";
// import request from './request';
// import app from './app';

import {ArticleListeners} from '../listeners';

export default function UIArticle(data){
    const container = document.getElementById("root");
    const article = document.getElementById("article");
    const overlay = document.getElementById("overlay");

    if(article){
	container.removeChild(article);
	container.removeChild(overlay);
    }

    let l = "<div id='overlay'></div>";
    
    let e = "<div id='article'>";
    e += "<h1>"+data.title+"</h1>"

    // metadata
    e += "<div class='meta'>";
    e += "<div class='infos'>Created on {date} by {user}";
    e += " | <span class='edited'>Edited on {date} by {user}</span>";
    e += "</div>";
    e += "<div class='tags'>{tag}, {tag}</div>";
    e += "<div class='position'>"+data.location.latitude+", "+data.location.longitude+"</div>";
    e += "</div>";
    
    // content
    e += "<div class='content'>"+data.content.low+"</div>"
    e += "</div>";

    container.insertAdjacentHTML("afterbegin", l);
    container.insertAdjacentHTML("afterbegin", e);

    ArticleListeners();
    
}

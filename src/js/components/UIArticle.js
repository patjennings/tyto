import * as globals from "../globals";
import appState from "../globals";
// import request from './request';
// import app from './app';

import {ArticleListeners} from '../listeners';

let st = new appState();

export default function UIArticle(data){
    const container = document.getElementById("root");
    const article = document.getElementById("article");
    const overlay = document.getElementById("overlay");

    if(article){
	container.removeChild(article);
	container.removeChild(overlay);
    }

    let l = "<div class='overlay'></div>";
    
    let e = "<div class='article' id='"+data.raw+"'>";
    e += "<h1>"+data.title+"</h1>"

    if(st.user !== null){
	e += "<button id='delete'>Delete article</button>";
	e += "<button id='edit'>Edit article</button>";
    }


    // metadata
    e += "<div class='meta'>";
    e += "<div class='infos'>Created on "+data.created.date+" by "+data.created.user;

    if(data.lastUpdated.date !== null){
	e += " | <span class='edited'>Edited on "+data.lastUpdated.date+" by "+data.lastUpdated.user+"</span>";
    }
    
    e += "</div>";
    e += "<div class='tags'>"+data.tags.join(", ")+"</div>";
    e += "<div class='position'>"+data.location.latitude+", "+data.location.longitude+"</div>";
    e += "</div>";
    
    // content
    e += "<div class='content'>"+data.content.full+"</div>"
    e += "</div>";

    container.insertAdjacentHTML("afterbegin", l);
    container.insertAdjacentHTML("afterbegin", e);

    ArticleListeners();
    
}

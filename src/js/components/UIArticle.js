import * as globals from "../globals";
import appState from "../globals";

import {removeUIInput} from '../components/UIUtils';

// import {ArticleListeners} from '../listeners';
// import listenersUpdate from '../listenersUpdate';

import articleActions from '../listeners/articleActions';

let st = new appState();

export default function UIArticle(data){
    // console.log(data);
    st.selectedArticle = data._id;
    
    const container = document.getElementById("root");
    const article = document.querySelector(".article");
    const overlay = document.querySelector(".overlay");

    if(article){
	removeUIInput();
    }

    let l = "<div class='overlay'></div>";
    
    let e = "<div class='article' id='"+data.titleRaw+"'>";
    e += "<h1>"+data.title+"</h1>";
    e += "<button id='delete'>Delete article</button>";
    e += "<button id='edit'>Edit article</button>";
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
    e += "<div class='content'>"+data.content.full+"</div>";
    e += "</div>";

    container.insertAdjacentHTML("afterbegin", l);
    container.insertAdjacentHTML("afterbegin", e);
    
    articleActions(data);
    
}

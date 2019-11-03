import * as globals from "../globals";
import appState from "../globals";
// import request from './request';
// import app from './app';

import {ArticleListeners} from '../listeners';

let st = new appState();
export var simplemde;

export default function UIArticle(data, edit=false){
    console.log(data);
    const container = document.getElementById("root");
    const article = document.querySelector(".article");
    const overlay = document.querySelector(".overlay");

    if(article){
	container.removeChild(article);
	container.removeChild(overlay);
    }

    let l = "<div class='overlay'></div>";
    
    let e = "<div class='article' id='"+data.raw+"'>";

    edit ? e += "<input value='"+data.title+"'/>" : e += "<h1>"+data.title+"</h1>";

    if(st.user !== null && !edit){
	e += "<button id='delete'>Delete article</button>";
	e += "<button id='edit'>Edit article</button>";
    }

    if(edit){
	e += "<input value='"+data.tags.join(", ")+"'/>";
	var converter = new showdown.Converter();	   
	var md = converter.makeMarkdown(data.content.full);
	e += "<textarea id='content-edit' >"+md+"</textarea>";

    } else {
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
	e += "<div class='content'>"+data.content.full+"</div>";
	e += "</div>";
    }

    
    container.insertAdjacentHTML("afterbegin", l);
    container.insertAdjacentHTML("afterbegin", e);
    startMarkdownEditor();

    ArticleListeners(data);
    
}
function startMarkdownEditor(){
    console.log("start md editor");
    simplemde = new SimpleMDE({ 
        element: document.getElementById("content-edit") 
    });
}

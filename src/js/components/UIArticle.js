import * as globals from "../globals";
import appState from "../globals";

// import {ArticleListeners} from '../listeners';
// import listenersUpdate from '../listenersUpdate';

import articleActions from '../listeners/articleActions';
import articleUpdate from '../listeners/articleUpdate';

let st = new appState();

export default function UIArticle(data, edit=false){
    // console.log(data);
    // st.selectedArticle = data._id;
    const container = document.getElementById("root");
    const article = document.querySelector(".article");
    const overlay = document.querySelector(".overlay");

    if(article){
	container.removeChild(article);
	container.removeChild(overlay);
    }

    let l = "<div class='overlay'></div>";
    let e = "<div class='article' id='"+data.raw+"'>";

    edit ? e += "<input value='"+data.title+"' id='content-title'/>" : e += "<h1>"+data.title+"</h1>";

    if(st.user !== null && !edit){
	e += "<button id='delete'>Delete article</button>";
	e += "<button id='edit'>Edit article</button>";
    }

    if(edit){
	e += "<input value='"+data.tags.join(", ")+"' id='content-tags'/>";
	e += "<textarea id='content-edit' >"+data.content+"</textarea>";
	e += "<button type='submit' value='ok' class='btn highlight' id='document-validate'>Mettre à jour</button>";
	e += "<button value='cancel' class='btn' id='document-cancel'>Annuler</button>"

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
    
    if(edit){
	articleUpdate(data);
    }
    articleActions(data);
    
}

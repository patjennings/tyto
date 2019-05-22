// import * as globals from "./globals";
// import appState from "./globals";
// import request from './request';
// import app from './app';

export default function UIinputTerm(type, proj, articleLat, articleLong){
    const container = document.getElementById("root");
    let e;
    if(type=="content"){
	e = "<div id='input-container' style='transform: translate("+proj[0]+"px, "+proj[1]+"px);'>";
	// e = "<div id='input-container'>";
	e += "<input id='content-title' placeholder='Titre'></input>";
	e += "<textarea id='content-content' rows='18' placeholder='Contenu de cet article'></textarea>";
	e += "<input id='content-position-long' type='hidden' value='"+articleLong+"'/>";
	e += "<input id='content-position-lat' type='hidden' value='"+articleLat+"'/>";
	e += "<div class='btn-container'>";
	e += "<button type='submit' value='ok' class='btn highlight' id='document-validate'>Valider</button>";
	e += "<button value='cancel' class='btn' id='document-cancel'>Annuler</button>"
	e += "</div>";
	e += "</div>";

    
    } else if(type=="zone"){
	e = "<div id='input-container' style='transform: translate("+proj[0]+"px, "+proj[1]+"px);'>";
	// e = "<div id='input-container'>";
	e += "<input id='content-title' placeholder='Titre'></input>";
		e += "<input id='content-position-long' type='hidden' value='"+articleLong+"'/>";
	e += "<input id='content-position-lat' type='hidden' value='"+articleLat+"'/>";
	e += "<button type='submit' value='ok' class='btn highlight' id='document-validate'>Valider</button>";
	e += "<button value='cancel' class='btn' id='document-cancel'>Annuler</button>"
	e += "</div>";
	e += "</div>";

    
    }
    container.insertAdjacentHTML("afterbegin", e);
    
}

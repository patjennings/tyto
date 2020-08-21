// import * as globals from "./globals";
// import appState from "./globals";
// import request from './request';
// import app from './app';

export default function UIArticleNew(proj, lat, long, mode){
    const container = document.getElementById("root");
    let e;
    
    // e = "<div id='input-container' style='transform: translate("+proj[0]+"px, "+proj[1]+"px);'>";
    e = "<div id='input-container'>";
    e += "<input id='content-title' placeholder='Titre'></input>";
    e += "<textarea id='content-content' name='content-content'></textarea>";
    e += "<iframe name='rteeditor' id='rteeditor' onload='this.contentDocument.designMode=\"on\"'></iframe>";
    e += "<input id='content-position-long' type='hidden' value='"+long+"'/>";
    e += "<input id='content-position-lat' type='hidden' value='"+lat+"'/>";
    e += "<input id='content-tags' placeholder='tags'></input>";
    e += "<div class='btn-container'>";
    e += "<button type='submit' value='ok' class='btn highlight' id='document-validate'>Valider</button>";
    e += "<button value='cancel' class='btn' id='document-cancel'>Annuler</button>"
    e += "</div>";
    e += "</div>";

    container.insertAdjacentHTML("afterbegin", e);
    
}

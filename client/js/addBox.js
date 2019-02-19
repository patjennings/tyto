import * as vars from "./vars";
import appState from "./vars";
// import request from './request';
// import app from './app';

export default function addBox(proj, articleLat, articleLong){
    var e = "<div id='input-container' style='transform: translate("+proj[0]+"px, "+proj[1]+"px);'>";
    e += "<input id='content-title' placeholder='Titre'></input>";
    e += "<textarea id='content-content' rows='6' placeholder='Contenu de cet article'></textarea>";
    e += "<input id='content-position-long' type='hidden' value='"+articleLong+"'/>";
    e += "<input id='content-position-lat' type='hidden' value='"+articleLat+"'/>";
    e += "<div class='btn-container'><button type='submit' value='ok' class='btn highlight' id='document-validate'>Valider</button>";
    e += "<button value='cancel' class='btn' id='document-cancel'>Annuler</button></div></div>";

    return e;
}

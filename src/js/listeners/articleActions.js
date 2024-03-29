import * as globals from "../globals";
import appState from "../globals";
import UIArticleEdit from '../components/UIArticleEdit';
import request from '../request';
// import {paths} from '../conf/conf';
import Config from "Config";
import {requestPosts} from '../app';
import {removeUIArticle, removeUIInput} from '../components/UIUtils';

let ctrlPushed = false;
let altPushed = false;
var st = new appState();
var selectedNode = null;

export default function articleActions(data){
    
    const articleOverlay = document.querySelector(".overlay");
    const activeArticle =  document.querySelector(".article");
    const deleteArticle =  document.getElementById("delete");
    const editArticle =    document.getElementById("edit");

    // clic sur l'overlay (fermer)
    articleOverlay.addEventListener("click", e => {
	removeUIArticle();
    })

    // clic sur supprimer (fermer et supprimer)
    deleteArticle.addEventListener("click", e => {
	const titleRaw = activeArticle.getAttribute("id");
	
	// hiding
	articleOverlay.setAttribute("class", "overlay hiding")
	activeArticle.setAttribute("class", "article hiding")
	d3.select("#articles").select("#"+titleRaw).classed("deleting", true);
	
	// et on supprime après avoir laissé l'anim jouer
	window.setTimeout(d => {
	    activeArticle.parentNode.removeChild(activeArticle);
	    articleOverlay.parentNode.removeChild(articleOverlay);
	    request("DELETE",  Config.app.apiUrl+"/content/"+data._id, null, requestPosts);
	}, 650);
    })

    // clic sur edit (fermer et ouvrir l'éditeur)
    editArticle.addEventListener("click", e => {
	// const titleRaw = activeArticle.getAttribute("id");
	UIArticleEdit(null, null, null, true, data);
	removeUIArticle();
    });
}

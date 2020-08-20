import * as globals from "../globals";
import appState from "../globals";
import UIArticleNew from '../components/UIArticleNew';
import request from '../request';
import {paths} from '../conf/conf';
import {requestPosts} from '../app';

let ctrlPushed = false;
let altPushed = false;
var st = new appState();
var selectedNode = null;

export default function articleActions(data){

    // REMOVE ARTICLE
    // ----------------
    const articleOverlay = document.querySelector(".overlay");
    const activeArticle = document.querySelector(".article");
    const deleteArticle = document.getElementById("delete");
    const editArticle = document.getElementById("edit");
    
    articleOverlay.addEventListener("click", e => {
	articleOverlay.setAttribute("class", "overlay hiding")
	activeArticle.setAttribute("class", "article hiding")
	
	// et on supprime après avoir laissé l'anim jouer
	window.setTimeout(d => {
	    activeArticle.parentNode.removeChild(activeArticle);
	    articleOverlay.parentNode.removeChild(articleOverlay);
	}, 500)	
    })

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
	    request("DELETE",  paths.apiUrl+"/content/"+data._id, null, requestPosts);
	}, 650);
    })

    editArticle.addEventListener("click", e => {
	const titleRaw = activeArticle.getAttribute("id");
	UIArticleNew(null, null, null, "edit");
    })
}

// import scaleMap from "./scaleMap";
import * as globals from "./globals";
import appState from "./globals";
import addPost from "./addPost";
import addZone from "./addZone";
import request from "./request";
import app from "./app";
import {removeUIinput} from "./listeners";
// import {simplemde} from "./addPost";
import formattedDate from "./utils/formattedDate";
import {loginAlert} from './utils/loginManager';
import UIArticle from "./components/UIArticle";
import logs from "./utils/logs";

let ctrlPushed = false;
let altPushed = false;

var st = new appState();

var selectedNode = null;

export default function listenersSave(target, data){

    var btnValidate = document.getElementById("document-validate");
    var btnCancel = document.getElementById("document-cancel");

    btnValidate.addEventListener('click', function() {

	var titleValue = document.getElementById("content-title").value;
	var longValue = document.getElementById("content-position-long").value;
	var latValue = document.getElementById("content-position-lat").value;

	if(target == "content"){ // si c'est un article
	    // var simplemde = new SimpleMDE({
	    // 	element: document.getElementById("content-content")
	    // });
	    // const contentValue = simplemde.value();

	    const contentValue = document.getElementById("content-content").value;
	    const tagsValue = document.getElementById("content-tags").value;
	    const moment = formattedDate();

	    logs("title : "+titleValue);
	    logs("location : "+longValue+", "+latValue);
	    logs("content : "+contentValue);
	    logs("tags : "+tagsValue);
	    logs("moment : "+moment);
	    logs("user : "+st.user);

	    if(st.user !== null){
		// __OLD__ request("POST", "server/utils/SaveMarkdownDocument.php", "title="+titleValue+"&content="+contentFormatted+"&space="+st.space, app);

		/// requete, ajout d'article
	    } else {
		loginAlert();
		app();
	    }
	}
	
	else if(target == "zone"){ // si c'est une zone
	    // var longValue = document.getElementById("content-position-long").value;
	    // var latValue = document.getElementById("content-position-lat").value;

	    logs("title : "+titleValue);
	    logs("location : "+longValue+", "+latValue);

	    if(st.user !== null){
		// __OLD__ request("POST", "server/utils/SaveZone.php", "title="+titleValue+"&latitude="+latValue+"&longitude="+longValue+"&space="+st.space, app);
		// requete ajout zone
	    } else {
		loginAlert();
		app();
	    }
	} 
	removeUIinput();
    }, false);

    btnCancel.addEventListener('click', function() {
	removeUIinput();
    }, false);
}

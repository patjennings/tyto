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
import {paths} from './conf/conf';


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
	    const rteeditor = document.getElementById("rteeditor");
	    const contentValue = rteeditor.contentWindow.document.body.innerHTML;
	    // const tagsValue = document.getElementById("content-tags").value;
	    const tagsValue = ["ok", "super"];
	    const moment = formattedDate();

	    const data = {
		"title": titleValue,
		"location": {
		    "latitude": latValue,
		    "longitude": longValue
		},
		"content":{
		    "high": null,
		    "medium": null,
		    "low": null,
		    "full": contentValue
		},
		"tags": tagsValue,
		"created": {
		    "user": st.user,
		    "date": moment
		},
		"lastUpdated": {
		    "user": null,
		    "date": null
		},
		"relations": [
		    "tag1", "tag2"
		],
		"space": st.space
		
	    };
	    // logs(data);
	    // JSON.stringify();
	    
	    // __OLD__ request("POST", "server/utils/SaveMarkdownDocument.php", "title="+titleValue+"&content="+contentFormatted+"&space="+st.space, app);
	    request("POST", paths.apiUrl+"/content", JSON.stringify(data), app);
	    // var zonesData = request("POST", paths.apiUrl+"/"+st.space+"/content", data, app);

	    /// requete, ajout d'article
	}
	
	else if(target == "zone"){ // si c'est une zone
	    // var longValue = document.getElementById("content-position-long").value;
	    // var latValue = document.getElementById("content-position-lat").value;

	    logs("title : "+titleValue);
	    logs("location : "+longValue+", "+latValue);

	    // __OLD__ request("POST", "server/utils/SaveZone.php", "title="+titleValue+"&latitude="+latValue+"&longitude="+longValue+"&space="+st.space, app);
	    // requete ajout zone
	} 
	removeUIinput();
    }, false);

    btnCancel.addEventListener('click', function() {
	removeUIinput();
    }, false);
}

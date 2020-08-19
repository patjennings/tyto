// import scaleMap from "./scaleMap";
import * as globals from "./globals";
import appState from "./globals";
import addPost from "./addPost";
import addZone from "./addZone";
import request from "./request";
import app from "./app";
import {removeUIinput} from "./listeners";
import formattedDate from "./utils/formattedDate";
import {loginAlert} from './utils/loginManager';
import UIArticle from "./components/UIArticle";
import logs from "./utils/logs";
import {paths} from './conf/conf';
import getTags from './utils/getTags';

let ctrlPushed = false;
let altPushed = false;

var st = new appState();

var selectedNode = null;

export default function listenersSave(target, data){

    var btnValidate = document.getElementById("document-validate");
    var btnCancel = document.getElementById("document-cancel");

    btnValidate.addEventListener('click', function() {

	var title = document.getElementById("content-title").value;
	var longitude = document.getElementById("content-position-long").value;
	var latitude = document.getElementById("content-position-lat").value;

	if(target == "content"){ // si c'est un article
	    const rteeditor = document.getElementById("rteeditor");
	    const content = rteeditor.contentWindow.document.body.innerHTML;

	    const tagsWrapper = document.getElementById("content-tags")
	    const tags = getTags(tagsWrapper.value);
	    const moment = formattedDate();

	    const data = {
		"title": title,
		"location": {
		    "latitude": latitude,
		    "longitude": longitude
		},
		"content":{
		    "high": null,
		    "medium": null,
		    "low": null,
		    "full": content
		},
		"tags": tags,
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
	    logs(data);
	    // request("POST", paths.apiUrl+"/content", JSON.stringify(data), app);
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

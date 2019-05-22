// import scaleMap from "./scaleMap";
import * as globals from "./globals";
import appState from "./globals";
import addPost from "./addPost";
import addZone from "./addZone";
import request from "./request";
import app from "./app";
import {removeUIinput} from "./listeners";
import {simplemde} from "./addPost";
import formattedDate from "./utils/formattedDate";

let ctrlPushed = false;
let altPushed = false;

var st = new appState();

var selectedNode = null;

export default function listenersSave(target){

    var btnValidate = document.getElementById("document-validate");
    var btnCancel = document.getElementById("document-cancel");
    
    btnValidate.addEventListener('click', function() {
	// console.log("save file");

	var titleValue = document.getElementById("content-title").value;
	var longValue = document.getElementById("content-position-long").value;
	var latValue = document.getElementById("content-position-lat").value;
	
	
	if(target == "content"){ // si c'est un article
	    var contentValue = simplemde.value();
	    // var contentValue = contentValue.value();
	    // var contentValue = document.getElementById("content-content").value;

	    const moment = formattedDate();
	    
	    // le title intégré dans la desc du markdown
	    var contentFormatted = "title: "+titleValue+"\n";
	    contentFormatted += "position: "+latValue+", "+longValue+"\n";
	    contentFormatted += "created: "+st.user+", "+moment+"\n";
	    contentFormatted += "lastupdated: \n";
	    contentFormatted += "tags: tag1, tag2\n";
	    contentFormatted += "relations: 0\n\n";
	    contentFormatted += "---\n\n";
	    contentFormatted += contentValue;

	    // console.log(contentFormatted);
	    
	    request("POST", "server/utils/SaveMarkdownDocument.php", "title="+titleValue+"&content="+contentFormatted+"&space="+st.space, app);
	}
	if(target == "zone"){
	    var longValue = document.getElementById("content-position-long").value;
	    var latValue = document.getElementById("content-position-lat").value;
	    request("POST", "server/utils/SaveZone.php", "title="+titleValue+"&latitude="+latValue+"&longitude="+longValue+"&space="+st.space, app);
	}
	removeUIinput();
    }, false);


    
    btnCancel.addEventListener('click', function() {
	removeUIinput();
    }, false);    
}

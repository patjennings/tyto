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

let ctrlPushed = false;
let altPushed = false;

var st = new appState();

var selectedNode = null;

export default function listenersUpdate(data){

    var btnValidate = document.getElementById("document-validate");
    var btnCancel = document.getElementById("document-cancel");

    btnValidate.addEventListener('click', function() {
	// console.log("update file");

	var titleValue = document.getElementById("content-title").value;

	var longitude = data.location.longitude;
	var latitude = data.location.latitude;

	var simplemde = new SimpleMDE({ 
            element: document.getElementById("content-edit") 
	});
	var contentValue = simplemde.value();
	// console.log(document.getElementById("content-edit"));
	var tagsValue = document.getElementById("content-tags").value;

	const moment = formattedDate();
	
	// le title intégré dans la desc du markdown
	var contentFormatted = "title: "+titleValue+"\n";
	contentFormatted += "position: "+latValue+", "+longValue+"\n";
	contentFormatted += "created: "+st.user+", "+moment+"\n";
	contentFormatted += "lastupdated: \n";
	contentFormatted += "tags: "+tagsValue+"\n";
	contentFormatted += "relations: 0\n\n";
	contentFormatted += "---\n\n";
	contentFormatted += contentValue;

	// console.log(contentFormatted);
	
	UIArticle(data);
    }, false);

    btnCancel.addEventListener('click', function() {
	UIArticle(data);
    }, false);
}

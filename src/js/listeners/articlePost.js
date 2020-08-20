import * as globals from "../globals";
import appState from "../globals";
import removeUIInput from '../components/removeUIInput';
import {paths} from '../conf/conf';
import getTags from '../utils/getTags';
import formattedDate from '../utils/formattedDate';
import request from '../request';
import {requestPosts} from '../app';

var st = new appState();
var selectedNode = null;

export default function articlePost(){
    var btnValidate = document.getElementById("document-validate");
    var btnCancel = document.getElementById("document-cancel");

    btnValidate.addEventListener('click', function() {

	var title = document.getElementById("content-title").value;
	var longitude = document.getElementById("content-position-long").value;
	var latitude = document.getElementById("content-position-lat").value;

	const rteeditor = document.getElementById("rteeditor");
	const contentRaw = rteeditor.contentWindow.document.body.innerHTML;
	const content = processContent(contentRaw);

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
	request("POST", paths.apiUrl+"/content", JSON.stringify(data), requestPosts);
	removeUIInput();
    }, false);

    btnCancel.addEventListener('click', function() {
	removeUIInput();
    }, false);
}

function processContent(data){
    return null;
}

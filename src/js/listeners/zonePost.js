import * as globals from "../globals";
import appState from "../globals";
import removeUIInput from '../components/removeUIInput';
import formattedDate from '../utils/formattedDate';
import request from '../request';
import {requestZones} from '../app';
import {paths} from '../conf/conf';

let ctrlPushed = false;
let altPushed = false;
var st = new appState();
var selectedNode = null;

export default function zonePost(){
    var btnValidate = document.getElementById("document-validate");
    var btnCancel = document.getElementById("document-cancel");

    btnValidate.addEventListener('click', function() {

	var title = document.getElementById("content-title").value;
	var longitude = document.getElementById("content-position-long").value;
	var latitude = document.getElementById("content-position-lat").value;

	const moment = formattedDate();

	const data = {
	    "title": title,
	    "location": {
		"latitude": latitude,
		"longitude": longitude
	    },
	    "created": {
		"user": st.user,
		"date": moment
	    },
	    "lastUpdated": {
		"user": null,
		"date": null
	    },
	    "space": st.space
	}
	    
	// console.log(data);
	request("POST", paths.apiUrl+"/zones", JSON.stringify(data), requestZones);
	removeUIInput();
    }, false);

    btnCancel.addEventListener('click', function() {
	removeUIInput();
    }, false);
}

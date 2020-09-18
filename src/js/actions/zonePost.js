import * as globals from "../globals";
import appState from "../globals";
import {removeUIInput} from '../components/UIUtils';
import formattedDate from '../utils/formattedDate';
import request from '../request';
import {requestZones} from '../app';
// import {paths} from '../conf/conf';
import Config from "Config";
var st = new appState();
var selectedNode = null;

export default function zonePost(){

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
   
    request("POST", Config.app.apiUrl+"/zones", JSON.stringify(data), requestZones);
}

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
	const content = getSlicedContent(contentRaw);

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
		"high": content.high,
		"mid": content.medium,
		"low": content.low,
		"full": contentRaw
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

export function getSlicedContent(data){
    // /!\ TEST ZONE /!\
    // const testData="<h2>Le titre, c'est <br></h2><h1><br>formidable</h1><div><h2>hou, encore</h2><div><h3>petit,<br> petit<br></h3></div></div><h1>dernier</h1>";
    // const bigC = processByLevel(testData, "b");
    // const mediumC = processByLevel(testData, "m");
    // const smallC = processByLevel(testData, "s");
    // /!\ TEST ZONE /!\
    
    // find /big
    const bigC = processByLevel(data, "b"); // sélectionne h1 seulement
    const mediumC = processByLevel(data, "m"); // résultat: avoir h1 et h2 imbriqués / match h3, retirer le match, retirer les balises et les <br>
    const smallC = processByLevel(data, "s"); // avoir tout imbriqué / remplacer

    const result = {
	"high": bigC,
	"medium": mediumC,
	"low": smallC
    }
    return result;
}

function processByLevel(str, method){
    let patt;
    let content;
    
    if(method == "b"){
	patt = new RegExp("<h1>(.*?)</h1>", "g");
	content = [...str.matchAll(patt)];
    }
    if(method == "m"){
	patt = new RegExp("(<h1>.*?</h1>|<h2>.*?</h2>)", "g");
	content = [...str.matchAll(patt)];
    }
    if(method == "s"){
	patt = new RegExp("(<h1>.*?</h1>|<h2>.*?</h2>|<h3>.*?</h3>)", "g");
	content = [...str.matchAll(patt)];
    }
    let bTot = "";

    const bOcc = content.forEach(d => {
	bTot += d[1]+"… ";
    });			 
    
    let bRes = bTot.replace(/(<br>|<div>|<\/div>)/g, "");
    bRes = bRes.replace(/<h1>/g, "<span class='big'>");
    bRes = bRes.replace(/<h2>/g, "<span class='medium'>");
    bRes = bRes.replace(/<h3>/g, "<span class='small'>");
    bRes = bRes.replace(/<\/h1>/g, "</span>");
    bRes = bRes.replace(/<\/h2>/g, "</span>");
    bRes = bRes.replace(/<\/h3>/g, "</span>");
    return bRes;
}

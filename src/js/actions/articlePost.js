import * as globals from "../globals";
import appState from "../globals";
import {removeUIInput} from '../components/UIUtils';
import {paths} from '../conf/conf';
import getTags from '../utils/getTags';
import formattedDate from '../utils/formattedDate';
import request from '../request';
import {requestPosts} from '../app';

var st = new appState();
var selectedNode = null;

export default function articlePost(method){
    const title = document.getElementById("content-title").value;
    const titleRaw = getRawTitle(title);
    const longitude = document.getElementById("content-position-long").value;
    const latitude = document.getElementById("content-position-lat").value;

    const rteeditor = document.getElementById("rteeditor");
    const contentRaw = rteeditor.contentWindow.document.body.innerHTML;
    const content = getSlicedContent(contentRaw);

    const tagsWrapper = document.getElementById("content-tags")
    const tags = getTags(tagsWrapper.value);
    const moment = formattedDate();

    let userData;
    if(method=="post"){
	userData = {
	    "created": {
		"user": st.user,
		"date": moment
	    },
	    "lastUpdated": {
		"user": null,
		"date": null
	    }
	}   
    }
    if(method=="put"){
	userData = {
	    "lastUpdated": {
		"user": st.user,
		"date": moment
	    }
	}   
    }
    const data = {
	"title": title,
	"titleRaw": titleRaw,
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
	...userData,
	"relations": [
	    "tag1", "tag2"
	],
	"space": st.space
	
    };

    if(method=="post"){
	request("POST", paths.apiUrl+"/content", JSON.stringify(data), requestPosts);
    }
    if(method=="put"){
	request("PUT", paths.apiUrl+"/content/"+st.selectedArticle, JSON.stringify(data), requestPosts);
    }
    

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
export function getRawTitle(str){
    // const testData = "La super phrase avé léaçents et toùùùût! ?";
    let strProcessed = str.latinise();
    strProcessed = strProcessed.toLowerCase();
    return strProcessed;
}

String.prototype.latinise = function() {
	return this.replace(/[^A-Za-z0-9]/g, function(x) { return unwantedChars[x] || x; })
};
String.prototype.latinize = String.prototype.latinise;
String.prototype.isLatin = function() {
	return this == this.latinise();
};

const unwantedChars = {
    "?":"-",
    "!":"-",
    "\"":"-",
    ",":"-",
    "\n":"-",
    " ":"-",
    "Š":"S",
    "š":"s",
    "Ž":"Z",
    "ž":"z",
    "À":"A",
    "Á":"A",
    "Â":"A",
    "Ã":"A",
    "Ä":"A",
    "Å":"A",
    "Æ":"A",
    "Ç":"C",
    "È":"E",
    "É":"E",
    "Ê":"E",
    "Ë":"E",
    "Ì":"I",
    "Í":"I",
    "Î":"I",
    "Ï":"I",
    "Ñ":"N",
    "Ò":"O",
    "Ó":"O",
    "Ô":"O",
    "Õ":"O",
    "Ö":"O",
    "Ø":"O",
    "Ù":"U",
    "Ú":"U",
    "Û":"U",
    "Ü":"U",
    "Ý":"Y",
    "Þ":"B",
    "ß":"Ss",
    "à":"a",
    "á":"a",
    "â":"a",
    "ã":"a",
    "ä":"a",
    "å":"a",
    "æ":"a",
    "ç":"c",
    "è":"e",
    "é":"e",
    "ê":"e",
    "ë":"e",
    "ì":"i",
    "í":"i",
    "î":"i",
    "ï":"i",
    "ð":"o",
    "ñ":"n",
    "ò":"o",
    "ó":"o",
    "ô":"o",
    "õ":"o",
    "ö":"o",
    "ø":"o",
    "ù":"u",
    "ú":"u",
    "û":"u",
    "ý":"y",
    "þ":"b",
    "ÿ":"y"
};


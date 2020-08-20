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
		"high": content.high,
		"medium": content.medium,
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

export function processContent(data){
    // const bigContentPattern = new RegExp("(?<=<h1>)(.*?)(?=</h1>)");

    // const testData="<h2>Le titre, c'est <br></h2><h1><br>formidable</h1><div><h2>hou, encore</h2><div><h3>petit,<br> petit<br></h3></div></div><h1>dernier</h1>";

    // find /big
    const bigC = processForTag(data, "b"); // sélectionne h1 seulement
    const mediumC = processForTag(data, "m"); // résultat: avoir h1 et h2 imbriqués / match h3, retirer le match, retirer les balises et les <br>
    const smallC = processForTag(data, "s"); // avoir tout imbriqué / remplacer
    
    // console.log(bigC);
    // console.log(mediumC);
    // console.log(smallC);

    const result = {
	"high": bigC,
	"medium": mediumC,
	"low": smallC
    }

    //exclude <br> from each
    // const excludeBr = [...getBigContent.matchAll(smallContentPattern)]
    
    return result;

    //on suppr tout ce qui est div
    // on place <h1> dans <  
}

function processForTag(str, method){
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
	 content = str;
    }

    
    // console.log(content);
    let bTot = "";

    if(method !== "s"){
	const bOcc = content.forEach(d => {
	    // console.log(d[1]);
	    bTot += d[1]+"… ";
	});
    } else {
	bTot = content;
    }
    
    // console.log(bTot);

    let bRes = bTot.replace(/<br>/g, "");
    return bRes;
}

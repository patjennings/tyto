import * as vars from "./vars";
import appState from "./vars";
import request from './request';
import app from './app';

let isCreating = null;
var st = new appState();
var simplemde;

export default function create(currentPosition){
    var long = currentPosition[1];
    var lat = currentPosition[0];
    st.isCreating = true;

    // create layer w/ input + save button
    var proj = vars.projection([
	lat,
	long
    ])
    var content = "";
    
    var elements = "<div id='input-container' style='transform: translate("+proj[0]+"px, "+proj[1]+"px);'><input id='content-title' placeholder='Titre'></input><textarea id='content-content' rows='6' placeholder='Contenu'>"+content+"</textarea><input id='content-position-long' type='hidden' value='"+long+"'/><input id='content-position-lat' type='hidden' value='"+lat+"'/><div class='btn-container'><button type='submit' value='ok' class='btn highlight' id='document-validate'>Valider</button><button value='cancel' class='btn' id='document-cancel'>Annuler</button></div></div>";
    
    $(".map").append(elements);
    startMarkdownEditor();
    save();
    
    // save/create file

    
}


function save(){
    var btnValidate = document.getElementById("document-validate");
    var btnCancel = document.getElementById("document-cancel");
    
    btnValidate.addEventListener('click', function() {
	console.log("save file");

	var titleValue = document.getElementById("content-title").value;
	var longValue = document.getElementById("content-position-long").value;
	var latValue = document.getElementById("content-position-lat").value;
	var contentValue = simplemde.value();
	var contentFormatted = "title: "+titleValue+"\nposition: "+longValue+", "+latValue+"\n\n---\n"+contentValue; // le title intégré dans la desc du markdown
	
	request("POST", "includes/SaveMarkdownDocument.php", "title="+titleValue+"&content="+contentFormatted, app);
    }, false);
    
    btnCancel.addEventListener('click', function() {
	var elem = document.getElementById("input-container");
	elem.parentNode.removeChild(elem);
	st.isCreating = false;
	// console.log(this);
    }, false);
}

function startMarkdownEditor(){
    // var editor = new Editor({
    // 	element: document.getElementById("content-content")
    // });

    // editor.render();

    simplemde = new SimpleMDE({ 
        element: document.getElementById("content-content") 
    });
}

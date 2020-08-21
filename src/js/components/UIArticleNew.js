import * as globals from "../globals";
import appState from "../globals";
// import request from './request';
// import app from './app';
import editorActions from "../listeners/editorActions";

var st = new appState();
let styleSwitcher = false;

export default function UIArticleNew(proj, lat, long, edit=false, data=null){
    const container = document.getElementById("root");
    let e;

    // console.log(data);

    if(!edit){ // nouvel article
	// e = "<div id='input-container' style='transform: translate("+proj[0]+"px, "+proj[1]+"px);'>";
	e = "<div id='input-container'>";
	e += "<input id='content-title' placeholder='Titre'></input>";
	e += "<textarea id='content-content' name='content-content'></textarea>";
	e += "<iframe name='rteeditor' id='rteeditor' onload='this.contentDocument.designMode=\"on\"'></iframe>";
	e += "<input id='content-position-long' type='hidden' value='"+long+"'/>";
	e += "<input id='content-position-lat' type='hidden' value='"+lat+"'/>";
	e += "<input id='content-tags' placeholder='tags'></input>";
	e += "<div class='btn-container'>";
	e += "<button type='submit' value='ok' class='btn highlight' id='document-validate'>Valider</button>";
	e += "<button value='cancel' class='btn' id='document-cancel'>Annuler</button>"
	e += "</div>";
	e += "</div>";
	container.insertAdjacentHTML("afterbegin", e);
    } else { // article édité
	e = "<div id='input-container'>";
	e += '<input id="content-title" value="'+data.title+'"></input>';
	e += "<textarea id='content-content' name='content-content'></textarea>";
	e += "<iframe name='rteeditor' id='rteeditor' onload='this.contentDocument.designMode=\"on\"'></iframe>";
	e += "<input id='content-position-long' type='hidden' value='"+data.location.longitude+"'/>";
	e += "<input id='content-position-lat' type='hidden' value='"+data.location.latitude+"'/>";
	e += "<input id='content-tags' value="+data.tags+"></input>";
	e += "<div class='btn-container'>";
	e += "<button type='submit' value='ok' class='btn highlight' id='document-update'>Mettre à jour</button>";
	e += "<button value='cancel' class='btn' id='document-cancel'>Annuler</button>"
	e += "</div>";
	e += "</div>";
	container.insertAdjacentHTML("afterbegin", e);
	
	// on doit afficher le contenu dans l'iframe après un timeout, sinon, il est écrasé pendant l'initialisation du bazar
	window.setTimeout(d => {
	    rteeditor.document.body.innerHTML = data.content.full;
	}, 150);
    }
    
    editorActions();
    richEditor();
}

// launch l'éditeur riche
function richEditor(){
    let textArea = document.getElementById("content-content");
    let wrapper = textArea.parentNode;

    rteeditor.focus();
    
    rteeditor.addEventListener('mouseup', function() {
    	let e = window.event;
	let posX = e.clientX;
	let posY = e.clientY;

	st.isStyling = true;
	
	if (styleSwitcher == false) {
	    displayStyleInput(wrapper, rteeditor, posX, posY);
	    styleSwitcher = true;
	} else {
	    hideStyleInput();
	    styleSwitcher = false;
	}
    });
}

// 
function displayStyleInput(wrapper, editor, x, y){
    const styleEditor = document.getElementById("style-editor");
    if(styleEditor !== null){
	styleEditor.remove();
    }
    const newStyleEditor = "<div id='style-editor' style='position: absolute; left:"+x+"px; top:"+y+"px'><input id='style-editor--input'></input></div>"
    wrapper.insertAdjacentHTML("afterbegin", newStyleEditor);

    // select element
    const nse = document.getElementById("style-editor--input");
    nse.focus();

    window.addEventListener('keydown', (event) => {
	if(event.keyCode == 13) {
	    if(nse.value == "/big"){		
		editor.document.execCommand("heading", false, "<h1>");
	    }
	    if(nse.value == "/medium"){		
		editor.document.execCommand("heading", false, "<h2>");
	    }
	    if(nse.value == "/small"){		
		editor.document.execCommand("heading", false, "<h3>");
	    }
	    hideStyleInput();
	    // editor.focus();
	    // console.log(editor.document.body.innerHTML);
	}
    }, false);
    // hit enter, apply style with execcommand
}
function hideStyleInput(){
    const nse = document.getElementById("style-editor--input");
    nse ? nse.remove() : null;
}


// function getSel() // javascript
// {
//     // obtain the object reference for the <textarea>
//     let txtarea = document.getElementById("mytextarea");
//     // obtain the index of the first selected character
//     let start = txtarea.selectionStart;
//     // obtain the index of the last selected character
//     let finish = txtarea.selectionEnd;
//     // obtain the selected text
//     let sel = txtarea.value.substring(start, finish);
//     // do something with the selected content
// }

// function startMarkdownEditor(){
//     simplemde = new SimpleMDE({ 
//         element: document.getElementById("content-content") 
//     });
// }

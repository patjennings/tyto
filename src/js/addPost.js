import * as globals from "./globals";
import appState from "./globals";
import request from './request';
import app from './app';
// import UIinput from './components/UIinput';
import UIinputTerm from './components/UIinputTerm';
import listenersSave from './listenersSave';
import UISpotCreation from './components/UISpotCreation';
import logs from './utils/logs';

let isCreating = null;
var st = new appState();
// export var simplemde;

export default function addPost(currentPosition){
    var long = currentPosition[1];
    var lat = currentPosition[0];
    st.isCreating = true;
    
    UISpotCreation("#4980ef", lat, long); // marquer l'endroit où la zone est créée

    // create layer w/ input + save button
    var proj = globals.projection([
	lat,
	long
    ])

    var elements = UIinputTerm("content", proj, long, lat);    
    // startMarkdownEditor();
    // startWYSIWYG();
    listenersSave("content");

    richEditor();
}

function richEditor(){
    // hide textArea
    var textArea = document.getElementById("content-content");
    var wrapper = textArea.parentNode;
    
    // const rte = document.createElement("iframe");
    // rte.setAttribute('name', 'rteeditor')
    // rte.setAttribute('id', 'rteeditor')
    // textWrapper.insertBefore(rte,textArea);

    // https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Editable_content/Rich-Text_Editing_in_Mozilla
    // part 1 > https://www.youtube.com/watch?v=JxdBzejlMyY
    // part 2 > https://www.youtube.com/watch?v=rnScNTAzC0c
    // infos de base : https://stackoverflow.com/questions/6007242/how-to-create-a-rich-text-editor
    // example > https://codepen.io/netsi1964/full/QbLLGW/
    // avec execCommand > https://developer.mozilla.org/fr/docs/Web/API/Document/execCommand
    // https://www.dyn-web.com/tutorials/iframes/refs/iframe.php
    
    // rteeditor.contentDocument.designMode = "on";
    // rteeditor.document.body.contentEditable = "true";

    // logs(rteeditor);

    rteeditor.addEventListener('mouseup', function() {
    	logs("event");
	// logs(window.mouseX);

	var e = window.event;

	var posX = e.clientX;
	var posY = e.clientY;

	logs(posX+"/"+posY);

	styleWindow(wrapper, rteeditor, posX, posY);
    });
}

function styleWindow(wrapper, editor, x, y){
    const styleEditor = document.getElementById("style-editor");
    if(styleEditor !== null){
	styleEditor.remove();
    }
    const newStyleEditor = "<div id='style-editor' style='position: absolute; left:"+x+"px; top:"+y+"px'><input id='style-editor--input'></input></div>"
    wrapper.insertAdjacentHTML("afterbegin", newStyleEditor);
    // newStyleEditor.focus();

    window.addEventListener('keydown', (event) => {
	if(event.keyCode == 13) {
	    const nse = document.getElementById("style-editor--input");
	    logs(nse.value);
	    logs(editor.document.body.innerHTML )

	    if(nse.value == "/title"){		
		editor.document.execCommand("heading", false, "<h3>");
	    }
	}
    }, false);
   

    // hit enter, apply style with execcommand
}



// function getSel() // javascript
// {
//     // obtain the object reference for the <textarea>
//     var txtarea = document.getElementById("mytextarea");
//     // obtain the index of the first selected character
//     var start = txtarea.selectionStart;
//     // obtain the index of the last selected character
//     var finish = txtarea.selectionEnd;
//     // obtain the selected text
//     var sel = txtarea.value.substring(start, finish);
//     // do something with the selected content
// }

// function startMarkdownEditor(){
//     simplemde = new SimpleMDE({ 
//         element: document.getElementById("content-content") 
//     });
// }

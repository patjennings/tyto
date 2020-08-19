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
let st = new appState();

let styleSwitcher = false;

// export var simplemde;

export default function addPost(currentPosition){
    let long = currentPosition[1];
    let lat = currentPosition[0];
    st.isCreating = true;
    
    UISpotCreation("#4980ef", lat, long); // marquer l'endroit où la zone est créée

    // create layer w/ input + save button
    let proj = globals.projection([
	lat,
	long
    ])

    let elements = UIinputTerm("content", proj, long, lat);    
    listenersSave("content");
    richEditor();
}

// launch l'éditeur riche
function richEditor(){
    let textArea = document.getElementById("content-content");
    let wrapper = textArea.parentNode;

    rteeditor.focus();

    // https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Editable_content/Rich-Text_Editing_in_Mozilla
    // part 1 > https://www.youtube.com/watch?v=JxdBzejlMyY
    // part 2 > https://www.youtube.com/watch?v=rnScNTAzC0c
    // infos de base : https://stackoverflow.com/questions/6007242/how-to-create-a-rich-text-editor
    // example > https://codepen.io/netsi1964/full/QbLLGW/
    // avec execCommand > https://developer.mozilla.org/fr/docs/Web/API/Document/execCommand
    // https://www.dyn-web.com/tutorials/iframes/refs/iframe.php
    
    rteeditor.addEventListener('mouseup', function() {
    	let e = window.event;
	let posX = e.clientX;
	let posY = e.clientY;

	st.isStyling = true;

	logs(styleSwitcher)
	
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
    logs("style input")
    const styleEditor = document.getElementById("style-editor");
    if(styleEditor !== null){
	styleEditor.remove();
    }
    const newStyleEditor = "<div id='style-editor' style='position: absolute; left:"+x+"px; top:"+y+"px'><input id='style-editor--input'></input></div>"
    wrapper.insertAdjacentHTML("afterbegin", newStyleEditor);
    // select element
    const nse = document.getElementById("style-editor--input");
    nse.focus();
    // newStyleEditor.focus();
    // editor.document.execCommand("heading", false, "<h2>");

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
	    // logs(editor.document.body.innerHTML);
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

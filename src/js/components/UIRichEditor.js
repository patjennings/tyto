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

export default function UIRichEditor(){
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

// affiche l'input pour renseigner le style
export function displayStyleInput(wrapper, editor, x, y){
    const styleEditor = document.getElementById("style-editor");
    if(styleEditor !== null){
	st.isStyling = false;
	styleEditor.remove();
    }
    const newStyleEditor = "<div id='style-editor' style='position: absolute; left:"+x+"px; top:"+y+"px'><input id='style-editor--input'></input></div>";
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
	    logs(editor.document.body.innerHTML);
	}
    }, false);
    // hit enter, apply style with execcommand
}

// masque l'input pour renseigner le style
export function hideStyleInput(){
    const nse = document.getElementById("style-editor--input");
    nse.remove();
}
// https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Editable_content/Rich-Text_Editing_in_Mozilla
// part 1 > https://www.youtube.com/watch?v=JxdBzejlMyY
// part 2 > https://www.youtube.com/watch?v=rnScNTAzC0c
// infos de base : https://stackoverflow.com/questions/6007242/how-to-create-a-rich-text-editor
// example > https://codepen.io/netsi1964/full/QbLLGW/
// avec execCommand > https://developer.mozilla.org/fr/docs/Web/API/Document/execCommand
// https://www.dyn-web.com/tutorials/iframes/refs/iframe.php

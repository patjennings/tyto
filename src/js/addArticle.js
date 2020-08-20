import * as globals from "./globals";
import appState from "./globals";
import request from './request';
import app from './app';
// import UIinput from './components/UIinput';
import UIArticleNew from './components/UIArticleNew';
import articlePost from './listeners/articlePost';
import UISpotCreation from './components/UISpotCreation';

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

    let elements = UIArticleNew("content", proj, long, lat);    
    articlePost();
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

	console.log(styleSwitcher)
	
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

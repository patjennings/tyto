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
    listenersSave("content");

    richEditor();
}

function richEditor(){
    var textArea = document.getElementById("content-content");
    var textWrapper = textArea.parentNode;

    
    const rte = document.createElement("iframe");
    rte.setAttribute('id', 'content-rte')
    textWrapper.insertBefore(rte,textArea);
    // logs(rte);

    textArea.addEventListener('keyup', function() {
	const doc = document.getElementById('content-rte').contentWindow.document;
	doc.open();
	doc.write(textArea.value);
	doc.close();
    });
}

function getSel() // javascript
{
    // obtain the object reference for the <textarea>
    var txtarea = document.getElementById("mytextarea");
    // obtain the index of the first selected character
    var start = txtarea.selectionStart;
    // obtain the index of the last selected character
    var finish = txtarea.selectionEnd;
    // obtain the selected text
    var sel = txtarea.value.substring(start, finish);
    // do something with the selected content
}

// function startMarkdownEditor(){
//     simplemde = new SimpleMDE({ 
//         element: document.getElementById("content-content") 
//     });
// }

import * as globals from "./globals";
import appState from "./globals";
import request from './request';
import app from './app';
import UIinput from './components/UIinput';
import listenersSave from './listenersSave';
import UISpotCreation from './components/UISpotCreation';

let isCreating = null;
var st = new appState();
export var simplemde;

export default function addContent(currentPosition){
    var long = currentPosition[1];
    var lat = currentPosition[0];
    st.isCreating = true;

    UISpotCreation("#4980ef", lat, long); // marquer l'endroit où la zone est créée


    // create layer w/ input + save button
    var proj = globals.projection([
	lat,
	long
    ])

    var elements = UIinput("content", proj, long, lat);
    
    $(".map").append(elements);
    startMarkdownEditor();

    listenersSave("content");
}

function startMarkdownEditor(){
    simplemde = new SimpleMDE({ 
        element: document.getElementById("content-content") 
    });
}

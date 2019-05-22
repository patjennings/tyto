import * as globals from "./globals";
import appState from "./globals";
import request from './request';
import app from './app';
// import UIinput from './components/UIinput';
import UIinputTerm from './components/UIinputTerm';
import listenersSave from './listenersSave';
import UISpotCreation from './components/UISpotCreation';

let isCreating = null;
var st = new appState();
// var simplemde;

export default function addZone(currentPosition){
    var long = currentPosition[1];
    var lat = currentPosition[0];
    st.isCreating = true;

    UISpotCreation("#ba1021", lat, long); // marquer l'endroit où la zone est créée
    
    // create layer w/ input + save button
    var proj = globals.projection([
	lat,
	long
    ])
    
    var elements = UIinputTerm("zone", proj, long, lat);
    
    // $(".map").append(elements);
    listenersSave("zone");
}

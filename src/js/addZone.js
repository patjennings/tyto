import * as globals from "./globals";
import appState from "./globals";
import request from './request';
import app from './app';
// import UIinput from './components/UIinput';
import UIZoneNew from './components/UIZoneNew';
import zonePost from './listeners/zonePost';
import UISpotCreation from './components/UISpotCreation';

let isCreating = null;
var st = new appState();

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
    
    var elements = UIZoneNew("zone", proj, long, lat);
    
    zonePost("zone");
}

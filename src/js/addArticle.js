import * as globals from "./globals";
import appState from "./globals";
// import request from './request';
import app from './app';
// import UIinput from './components/UIinput';
import UIArticleEdit from './components/UIArticleEdit';
import articlePost from './actions/articlePost';
import UISpotCreation from './components/UISpotCreation';

let isCreating = null;
let st = new appState();

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

    let elements = UIArticleEdit(proj, long, lat, false);    
    // richEditor();
}

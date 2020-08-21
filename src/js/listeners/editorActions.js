import * as globals from "../globals";
import appState from "../globals";
import articlePost from '../actions/articlePost';
import {removeUIInput} from '../components/UIUtils';

var st = new appState();

export default function editorActions(){
    // console.log("ditor actions");
    
    const btnValidate =    document.getElementById("document-validate");
    const btnUpdate =    document.getElementById("document-update");
    const btnCancel =      document.getElementById("document-cancel");

    // clic sur valider dans l'éditeur
    if(btnValidate){
	btnValidate.addEventListener('click', function() {
	    articlePost("post");
	    removeUIInput();
	}, false);
    }
    
    // clic sur valider dans l'éditeur
    if(btnUpdate){
	btnUpdate.addEventListener('click', function() {
	    articlePost("put");
	    removeUIInput();
	}, false);
    }

    
    // clic sur cancel dans l'éditeur (fermer l'éditeur)
    if(btnCancel){
	btnCancel.addEventListener('click', function() {
	    removeUIInput();
	}, false);
    }
}

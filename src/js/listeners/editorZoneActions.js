import * as globals from "../globals";
import appState from "../globals";
import zonePost from '../actions/zonePost';
import {removeUIInput} from '../components/UIUtils';

var st = new appState();

export default function editorZoneActions(){
    var btnValidate = document.getElementById("document-validate");
    var btnCancel = document.getElementById("document-cancel");

    btnValidate.addEventListener('click', function() {
	console.log("post zone");
	zonePost();	
	removeUIInput();
    }, false);

    btnCancel.addEventListener('click', function() {
	removeUIInput();
    }, false);
}

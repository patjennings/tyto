import * as globals from "../globals";
import appState from "../globals";
import {reset, setActiveSpace} from "../app";
import removeUIInput from '../components/removeUIInput';

// export let ctrlPushed = false;
// export let altPushed = false;

var st = new appState();
var selectedNode = null;

export default function actions(){
    window.addEventListener('keydown', (event) => {
	if(event.ctrlKey) {
	    st.isCtrlKeyPushed = true;
	}
	if(event.altKey) {
	    st.isAltKeyPushed = true;
	}
	if(event.keyCode == 27) { // ESC key
	    removeUIInput();    
	}
    }, false);

    window.addEventListener('keyup', (event) => {
	st.isCtrlKeyPushed = false;
	st.isAltKeyPushed = false;
    }, false);

    
    // ----------
    // NAVIGATION
    // ----------
    const navItems = document.querySelectorAll(".nav-item");

    for(let i=0; i<navItems.length; i++){
    	navItems[i].addEventListener('click', (event) => {
    	    setActiveSpace(i);
    	    reset();
    	}, false)
    }
}

import * as globals from "../globals";
import appState from "../globals";

var st = new appState();

export function removeUIInput(){
    console.log("stop la création");
    var box = document.getElementById("input-container");
    box.parentNode.removeChild(box);
    d3.select("svg").selectAll(".creation-spot").remove();
    st.isCreating = false;
    return null;
}
export function removeUIArticle(){
    const articleOverlay = document.querySelector(".overlay");
    const activeArticle =  document.querySelector(".article");
    
    articleOverlay.setAttribute("class", "overlay hiding")
    activeArticle.setAttribute("class", "article hiding")
    
    // et on supprime après avoir laissé l'anim jouer
    window.setTimeout(d => {
	activeArticle.parentNode.removeChild(activeArticle);
	articleOverlay.parentNode.removeChild(articleOverlay);
    }, 500);
}

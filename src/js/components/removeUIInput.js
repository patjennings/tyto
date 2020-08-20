import * as globals from "../globals";
import appState from "../globals";

var st = new appState();

export default function removeUIInput(){
    // console.log("stop la création");
    var box = document.getElementById("input-container");
    box.parentNode.removeChild(box);
    d3.select("svg").selectAll(".creation-spot").remove();
    st.isCreating = false;
    return null;
}

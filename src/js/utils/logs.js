import * as globals from "../globals";
import appState from "../globals";

let st = new appState();

export default function logs(data){
    if(st.logs == true){
	console.log(data);
    }

}

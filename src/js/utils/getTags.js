import * as globals from "../globals";
import appState from "../globals";

let st = new appState();

export default function getTags(data){
    const tags = data.split(",");
    console.log(tags);
    return tags;
}

// import * as globals from "./globals";

// this is the map() function from processing
export default function scale(num, in_min, in_max, out_min, out_max){
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

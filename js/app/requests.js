
// AJAX requests
function getRequestObject(){
    var o = null;
    if(window.XMLHttpRequest){
        o = new XMLHttpRequest();
    }else if(window.ActiveXObject){
        try{
            o = new ActiveXObject('Msxml2.XMLHTTP');
        }catch(e1){
            try{
                o = new ActiveXObject('Microsoft.XMLHTTP');
            }catch(e2){

            }
        }
    }
    return o;
}

export function request(method, uri, sendData, callback){
    var o = getRequestObject();
    var async = (callback!==null);
    var timestamp = new Date();
    var uniqueURI = uri+ (uri.indexOf("?") > 0 ? "&" : "?")+ "timestamp="+ timestamp.getTime();
    
    if(method === 'GET'){
        if(sendData!=null){uniqueURI+="?"+sendData;}
        o.open(method, uniqueURI, async);
        o.send(null);
    }else if(method === 'POST'){
        o.open(method, uniqueURI, async);
        o.setRequestHeader('Content-Type' , 'application/x-www-form-urlencoded');
        o.send(sendData);
    }
    if(async){
        o.onreadystatechange = function (){
            if(o.readyState==4&&o.status==200){
                callback(o.responseText);
                // console.log("Success");

            }else if(o.readyState==4&&o.status!=200){
                // console.log("Error")
            }
        };
    }
    if(async){return ;}
    else{return o.responseText;}
}

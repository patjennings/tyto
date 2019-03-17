import * as globals from "./globals";
import appState from "./globals";

var st = new appState();
let linkDisplay = false;

/////////////////////////
// Ajouter les articles
//////////////////////////

export default function displayPosts(data){

    st.postsData = JSON.parse(data); // on récupère les données des contenus
    
    d3.select("svg")
	.append("g")
	.attr("id", "articles")
	.selectAll("g")
	.data(st.postsData)
    	.enter()
    	.append("g")
    	.attr("class", "card")
    

    d3.selectAll(".card")	
    	.attr("id",function(d) {
    	    return d.raw;
    	})
    	.attr("transform", function(d) {
    	    var proj = globals.projection([
    		d.location.longitude,
    		d.location.latitude
    	    ])
	    return "translate(" + (proj[0]) +", "+(proj[1])+ ")";
	})

    d3.selectAll(".card")
	.append("circle")
	.attr("cx", 0)
    	.attr("cy", 0)
    	.attr("r", 4)
	.attr("fill", "#000000")


    d3.selectAll(".card")
	.append("svg:foreignObject")
	.attr("width", 256)
	.attr("height", 200)
	.attr("x", 4)
	.attr("y", 4)
	// .attr("style", "font-size: 12px; font-family: lato; font-weight: 400;")
	.append("xhtml:body")
	.append("div")
    	.attr("class", "card-title")
	.text(function(d) { return d.title; })

    d3.selectAll(".card")
	.select("body")
	.attr("id",function(d) {
    	    return "wrapper-"+d.raw;
    	})
	.append("div")
        .attr("class", "card-content")
	.html(function(d){return getContent(d);})
    
    d3.selectAll(".card")
	.select("body")
	.append("div")
        .attr("class", "card-link")
	.html(function(d){return linkDisplay ? getLink(d) : null;})

    adjustFoHeight();
}

// Permet d'ajuster automatiquement la hauteur du foreignObject en se basant sur le body
function adjustFoHeight(){
    d3.selectAll(".card")
	.select("foreignObject")
	.attr("height", function(d){
	    let bodyHeight = document.getElementById("wrapper-"+d.raw).clientHeight;
	    return bodyHeight;
	})

}

export function updatePosts(newProjection = null){
    // transforme les points au zoom et translate
    d3.selectAll(".card").attr("transform", function(d) {
	var proj = globals.projection([
	    d.location.longitude,
	    d.location.latitude
	])
	return "translate(" + (proj[0]) +", "+(proj[1])+ ")";
    })
    d3.selectAll(".card")
	.select(".card-content")
	.html(function(d){return getContent(d);})
    
    d3.selectAll(".card")
	.select(".card-link")
	.html(function(d){return linkDisplay ? getLink(d) : null;})

    adjustFoHeight();
}

// return the  content, related to zoom level
function getContent(data){
    if(st.scaleFac < toD3Scale(st.steps[1].level)){
	logger(st.steps[0].name, toD3Scale(st.steps[0].level), st.scaleFac)
	linkDisplay = false;
	d3.selectAll(".card")
	    .attr("class", "card "+st.steps[0].name)
	return null;
    }
    else if(st.scaleFac > toD3Scale(st.steps[1].level) && st.scaleFac < toD3Scale(st.steps[2].level)){
	logger(st.steps[1].name, toD3Scale(st.steps[1].level), st.scaleFac)
	linkDisplay = false;
	d3.selectAll(".card")
	    .attr("class", "card "+st.steps[1].name)
	return data.content.top;

    }
    else if(st.scaleFac > toD3Scale(st.steps[2].level) && st.scaleFac < toD3Scale(st.steps[3].level)){	
	logger(st.steps[2].name, toD3Scale(st.steps[2].level), st.scaleFac)
	linkDisplay = true;
	d3.selectAll(".card")
	    .attr("class", "card "+st.steps[2].name)
	return data.content.middle;

    }
    else if(st.scaleFac > toD3Scale(st.steps[3].level)){
	logger(st.steps[3].name, toD3Scale(st.steps[3].level), st.scaleFac)
	linkDisplay = true;
	d3.selectAll(".card")
	    .attr("class", "card "+st.steps[3].name)
	return data.content.low;

    }
}

function getLink(data){
    const link = "<a href='"+st.rootDir+"article.php?path="+st.rootDir+data.path+"'>Link</a>";
    return link;
}

function toD3Scale(initialScale){
    // get readable scale from my vars to unreadable scale for D3
    return initialScale*100000;
}

function logger(stName, stLevel, stCur){
    console.log(
	"Zoom level :"+stName+"("+stLevel/10000+") while at : "+stCur/10000
    );
}

import * as globals from "./globals";
import UIArticle from "./components/UIArticle";
import appState from "./globals";
import mapActions from "./listeners/mapActions";

var st = new appState();
let linkDisplay = false;

/////////////////////////
// Ajouter les articles
//////////////////////////

export default function displayArticles(data){
    const dataParse = JSON.parse(data); // on récupère les données des contenus
    st.postsData = dataParse.message;

    d3.select("#articles").remove() // On supprime si #articles existe, comme lors d'un déplacement de contenu > on reset
    
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

    // circle position
    d3.selectAll(".card")
    	.append("circle")
    	.attr("cx", 0)
    	.attr("cy", 0)
    	.attr("r", 2)
    	.attr("fill", "#ffffff")

    d3.selectAll(".card")
    	.append("circle")
    	.attr("class", "grip")
    	.attr("cx", 0)
    	.attr("cy", 0)
    	.attr("r", 12)
    	.attr("opacity", 0.05)
    	.attr("fill", "#ffffff")

    // circle relations
    d3.selectAll(".card")
    	.append("circle")
    	.attr("cx", 280)
    	.attr("cy", 0)
    	.attr("r", 2)
    	.attr("fill", "#6666ff")

    d3.selectAll(".card")
    	.append("circle")
    	.attr("class", "linker")
    	.attr("cx", 280)
    	.attr("cy", 0)
    	.attr("r", 12)
    	.attr("opacity", 0.05)
    	.attr("fill", "#6666ff")

    // content
    d3.selectAll(".card")
	.append("svg:foreignObject")
	.attr("class", "content")
	.attr("style", "position: relative;")
	.attr("width", 256)
	.attr("height", 200)
	.attr("x", 8)
	.append("xhtml:body")
	.append("div")
    	.attr("class", "card-title")
	.text(function(d) { return d.title; })

    d3.selectAll(".card")
	.select("body")
	.attr("id",function(d) {
    	    return "wrapper-"+d._id;
    	})
	.append("div")
        .attr("class", "card-content")
	.html(function(d){return getContent(d);})
    
    d3.selectAll(".card")
	.select("body")
	.append("div")
        .attr("class", "card-link")
	.html(function(d){return linkDisplay ? getLink(d) : null;})

    d3.selectAll(".card")
	.select("body")
	.append("div")
        .attr("class", "card-edit")
	.html(function(d){return linkDisplay ? editPost(d) : null;})

    
    
    adjustFoHeight();
    mapActions();
}

// Permet d'ajuster automatiquement la hauteur du foreignObject en se basant sur le body
function adjustFoHeight(){
    d3.selectAll(".card")
	.select("foreignObject")
	.attr("height", function(d){
	    let bodyHeight = document.getElementById("wrapper-"+d._id).clientHeight;
	    return bodyHeight;
	})
	.attr("y", function(d){
	    let bodyHeight = document.getElementById("wrapper-"+d._id).clientHeight;
	    return -((bodyHeight+12)/2);
	})

}

export function updateArticles(newProjection = null){
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
    // console.log(data.content);
    if(st.scaleFac < toD3Scale(st.steps[1].level)){
	// logger(st.steps[0].name, toD3Scale(st.steps[0].level), st.scaleFac)
	linkDisplay = false;
	d3.selectAll(".card")
	    .attr("class", "card "+st.steps[0].name)
	return null;
    }
    else if(st.scaleFac > toD3Scale(st.steps[1].level) && st.scaleFac < toD3Scale(st.steps[2].level)){
	// logger(st.steps[1].name, toD3Scale(st.steps[1].level), st.scaleFac)
	linkDisplay = false;
	d3.selectAll(".card")
	    .attr("class", "card "+st.steps[1].name)
	return data.content.high;

    }
    else if(st.scaleFac > toD3Scale(st.steps[2].level) && st.scaleFac < toD3Scale(st.steps[3].level)){	
	// logger(st.steps[2].name, toD3Scale(st.steps[2].level), st.scaleFac)
	linkDisplay = false;
	d3.selectAll(".card")
	    .attr("class", "card "+st.steps[2].name)
	return data.content.mid;

    }
    else if(st.scaleFac > toD3Scale(st.steps[3].level)){
	// logger(st.steps[3].name, toD3Scale(st.steps[3].level), st.scaleFac)
	linkDisplay = false;
	d3.selectAll(".card")
	    .attr("class", "card "+st.steps[3].name)
	return data.content.low;

    }
}

function getLink(data){
    const link = "<a href='"+st.rootDir+"server/article.php?path="+data.path+"'>Link</a>";
    return link;
}

function toD3Scale(initialScale){
    // get readable scale from my vars to unreadable scale for D3
    return initialScale*100000;
}

function editPost(data){
    console.log(data);
}

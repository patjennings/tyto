let isCreating = false;
let ctrlPushed = false;

// Ctrl key listener, pour utiliser avec le click lors de la création de documents
window.addEventListener('keydown', (event) => {
    if(event.ctrlKey) {
	ctrlPushed = true;
    }
}, false);


//
window.addEventListener('keyup', (event) => {
    ctrlPushed = false;
    
}, false);


// listener pour copier les coordonnées
window.addEventListener('keydown', (event) => {
    const nomTouche = event.key;

    // console.log("touche pressée !");

//     if (nomTouche === 'c') {
// 	// Pas d'alerte si seule la touche Control est pressée.
// 	copyTextToClipboard(currentPosition[1].toFixed(4)+", "+currentPosition[0].toFixed(4));
//     }
//     if (nomTouche === 't') {
// 	// Pas d'alerte si seule la touche Control est pressée.
// 	console.log("create it");
//     }
// }, false);

// Ctrl key listener, pour utiliser avec le click lors de la création de documents
window.addEventListener('keydown', (event) => {
    if(event.ctrlKey) {
	vars.ctrlPushed = true;
	console.log("ctrl enfoncé");
    }
}, false);


//
window.addEventListener('keyup', (event) => {
    
    vars.ctrlPushed = false;
    console.log("toutes les touches relachées");
    
}, false);


// listener pour copier les coordonnées
window.addEventListener('keydown', (event) => {
    const nomTouche = event.key;

    console.log("touche pressée !");

    if (nomTouche === 'c') {
	// Pas d'alerte si seule la touche Control est pressée.
	copyTextToClipboard(currentPosition[1].toFixed(4)+", "+currentPosition[0].toFixed(4));
    }
    if (nomTouche === 't') {
	// Pas d'alerte si seule la touche Control est pressée.
	console.log("create it");
    }
}, false);

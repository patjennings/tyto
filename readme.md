l'idée qui a conduit à ce projet est celle de pouvoir mettre en relation des idées dans un espace géographique, un genre de _carte du tendre_. dans cet espace, on crée des blocs de contenu, que l'on formatte selon leur "poids" : ainsi, plus l'élément est léger, plus haut on le voit et, plus l'élément est lourd, plus il va falloir zoomer pour le voir.
selon ce principe, on structure des idées qu'on pourra voir s'entrechoquer avec d'autres sur l'espace de la carte.

## Installation, lancement ##


1. Install Node.js & MongoDB if you haven't already.
2. Clone this repository and install its dependencies.

``` bash
git clone https://framagit.org/patjennings/tyto.git tyto
cd tyto
npm install
```

3. In a separate shell start MongoDB.

``` bash
mongod
```

4. Create the `tyto` database

``` bash
$ mongo
> use tyto
switched to db tyto
```

5. From within the `tyto` directory start the server.

``` bash
npm start
```

6. Open a browser window and navigate to: http://localhost:3000

## démo ##

https://tyto.thomasguesnon.net/

## utilisation ##

> niveaux de texte = niveaux de zoom
l'idée est de voir apparaitre de plus en plus de contenu à mesure que l'on zoome :
- au plus haut, on ne voit que les titres
- en zoomant, on voit apparaitre le **bold**
- puis on voit apparaitre *l'italique*. Ce qui est **bold**+*italic* apparait surligné
- puis on voit les 1200 premiers caractères

**titre : ultra-léger**
bold : léger
italic : moyen
rien : lourd

pour ajouter un élément : `ctrl+click` à l'endroit souhaité

### V2 ###
Quelques features qui seront implémentés après une première version stable
- découper les fichiers selon position = possibilité de repartir vers du texte entièrement. Tyto = outil de structuration
- lier les cartes/articles graphiquement
- gestion de compte (login, sécurisation)
- édition des zones

### Rich text edition ###
- https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Editable_content/Rich-Text_Editing_in_Mozilla
- part 1 > https://www.youtube.com/watch?v=JxdBzejlMyY
- part 2 > https://www.youtube.com/watch?v=rnScNTAzC0c
- infos de base : https://stackoverflow.com/questions/6007242/how-to-create-a-rich-text-editor
- example > https://codepen.io/netsi1964/full/QbLLGW/
- avec execCommand > https://developer.mozilla.org/fr/docs/Web/API/Document/execCommand
- https://www.dyn-web.com/tutorials/iframes/refs/iframe.php

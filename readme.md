l'idée qui a conduit à ce projet est celle de pouvoir mettre en relation des idées dans un espace géographique, un genre de _carte du tendre_. dans cet espace, on crée des blocs de contenu, que l'on formatte selon leur "poids" : ainsi, plus l'élément est léger, plus haut on le voit et, plus l'élément est lourd, plus il va falloir zoomer pour le voir.
selon ce principe, on structure des idées qu'on pourra voir s'entrechoquer avec d'autres sur l'espace de la carte.

## lancement ##
d'abord, on ouvre les droits en écriture sur `/content` (c'est là que les fichiers markdown sont créés

il faut pouvoir utiliser php, soit avec un genre de wamp ou de mamp ou de serveur apache configuré, ou alors avec ça (dans le terminal)

``` bash
$ cd tyto # se positionner sur le dossier
$ php -S localhost:8000 # lancer php, et ouvrir http://localhost:8000 dans le navigateur
```

## démo ##

http://tyto.thomasguesnon.net/

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

## reste à faire ##
- ~~ajouter fonctions basiques de preview/formattage markdown~~
- ~~possibilité de drag&dropper un élément + actualisation de la position dans le fichier lié~~
- possibilité d'éditer un élément
- on drag à partir de l'endroit où l'on a cliqué sur la carte, i.e. on ne bouge pas l'origine de celle-ci sous la souris au clic/drag 
- affichage de la page contenu, au clic sur une carte
- ranger les dossiers de façon plus claire (dossier src ? Les js dans assets ?)

### V2 ###
Quelques features qui seront implémentés après une première version stable
- découper les fichiers selon position = possibilité de repartir vers du texte entièrement. Tyto = outil de structuration
- gestion de compte (login, sécurisation)
- mode édition, mode consultation

map with contents. a click opens the article in its own page.

## lancement ##
d'abord, on ouvre les droits en écriture sur `/content` (c'est là que les fichiers markdown sont créés

il faut pouvoir utiliser php, soit avec un genre de wamp ou de mamp ou de serveur apache configuré, ou alors avec ça (dans le terminal)

``` bash
$ cd tyto # se positionner sur le dossier
$ php -S localhost:8000 # lancer php, et ouvrir http://localhost:8000 dans le navigateur
```

## démo ##

http://www.thomasguesnon.fr/platform/tyto/

## utilisation ##

> niveaux de texte = niveaux de zoom
l'idée est de voir apparaitre de plus en plus de contenu à mesure que l'on zoome :
- au plus haut, on ne voit que les titres
- en zoomant, on voit apparaitre le **bold**
- puis on voit apparaitre *l'italique*. Ce qui est **bold**+*italic* apparait surligné
- puis on voit les 1200 premiers caractères

Pour ajouter un élément : `ctrl+click` à l'endroit souhaité

## reste à faire ##
- ajouter fonctions basiques de preview/formattage markdown
- possibilité de drag&dropper un élément + actualisation de la position dans le fichier lié
- possibilité d'éditer un élément

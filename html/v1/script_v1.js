//Ajout d'un Pokemon dans le tableau
var secondLine = document.createElement("tr");

//Ajout de L'id
var id = document.createElement("td");
id.setAttribute("label", "ID");
var textID = document.createTextNode("25");
id.appendChild(textID);
secondLine.appendChild(id); 

//Ajout du nom
var nom = document.createElement("td");
nom.setAttribute("label", "NOM");
var textNom = document.createTextNode("Pikachu");
nom.appendChild(textNom);
secondLine.appendChild(nom);

//Ajout de la génération
var gen = document.createElement("th");
gen.setAttribute("label", "GEN");
var textGen = document.createTextNode("1");
gen.appendChild(textGen);
secondLine.appendChild(gen);

//Ajout du types
var types = document.createElement("th");
types.setAttribute("label", "TYPES");
var listType = document.createElement("ul");
var puce1 = document.createElement("li");
var textPuce1 = document.createTextNode("Electric");
puce1.appendChild(textPuce1);
listType.appendChild(puce1)
types.appendChild(listType)
secondLine.appendChild(types);

//Ajout de l'endurance
var end = document.createElement("th");
end.setAttribute("label", "ENDURANCE");
var textEnd = document.createTextNode("111");
end.appendChild(textEnd);
secondLine.appendChild(end); 

//Ajout de PTSA
var ptsa = document.createElement("th");
ptsa.setAttribute("label", "PTSA");
var textPtsa = document.createTextNode("112");
ptsa.appendChild(textPtsa);
secondLine.appendChild(ptsa); 

//Ajout de PTSD
var ptsd = document.createElement("th");
ptsd.setAttribute("label", "PTSD");
var textPtsd = document.createTextNode("96");
ptsd.appendChild(textPtsd);
secondLine.appendChild(ptsd); 

//Ajout IMG
var imgTH = document.createElement("th");
imgTH.setAttribute("label", "IMG");
var img = document.createElement("img");
img.setAttribute("src", "../webp/thumbnails/025.webp");
imgTH.appendChild(img)
secondLine.appendChild(imgTH); 

var table = document.querySelector("table");
table.appendChild(firstline); 
table.appendChild(secondLine)

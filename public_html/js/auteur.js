/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* 
 Ceci est equivalent à une classe Java, on veut faire propre! 
 */
/* global ko, self */

var Auteur = function (auteur) {
    this.id = ko.observable(auteur.id);
    this.dtype = ko.observable(auteur.dtype);
    this.datedenaissance = ko.observable(auteur.datedenaissance);
    
    this.email = ko.observable(auteur.email);
    this.nom = ko.observable(auteur.nom);
    //this.photo = ko.observable(auteur.photo);
    
    this.prenom = ko.observable(auteur.prenom);
    this.sexe = ko.observable(auteur.sexe);
    //this.aproposde = ko.observable(auteur.aproposde);
    
    this.nationalite = ko.observable(auteur.nationalite);

};

/* 
 Cette function est le controlleur de la vue  
 Elle assure la communication entre la vue et le modèle, une sorte de pont quoi!  
 
 var ViewModel = function(categories) {  
 var self = this;  
 //représente la liste des catégories  
 //La fonction prend la réponse obtenue du serveur en paramètre  
 //Ici nous supposons que vous avez chargé la liste des catégories  
 //ko.utils.arrayMap itère sur la collection et pour chaque objet trouvé, elle crée une instance de categorie   
 self.categories = ko.observableArray(ko.utils.arrayMap(categories, function(categorie) { return new Category(categorie);}));  
 };  */
var ViewModel = function (auteurs) {
    var self = this;
    self.initWithEmptyAuteur = function(){
        self.auteur = new Auteur({
            
        });
    };
    //
 //représente la liste des catégories  
    //La fonction prend la réponse obtenue du serveur en paramètre  
    //Ici nous supposons que vous avez chargé la liste des catégories  
    //ko.utils.arrayMap itère sur la collection et pour chaque objet trouvé, elle crée une instance de categorie   
    self.auteurs = ko.observableArray(ko.utils.arrayMap(auteurs, function (auteur) {
        return new Auteur(auteur);
    }));

    self.remove = function (auteur) {
        self.auteurs.remove(auteur);
        $.ajax({
            url: "http://localhost:8080/bibliotheque_ntdp/webresources/fr.unice.miage.ntdp.bibliotheque.auteur/"+auteur.id(),
            type: "DELETE",
            contentType: "application/json",
            headers: {
                Accept: "application/json"
            }
        }).done(function (data) { 
            
            self.auteurs.remove(auteur);
            alert("L'auteur a été supprimé.");
        });
    };
    self.update = function (auteur) {
        self.auteurs.replace(auteur.id(), auteur.id());
        $.ajax({
            url: "http://localhost:8080/bibliotheque_ntdp/webresources/fr.unice.miage.ntdp.bibliotheque.auteur/"+auteur.id(),
            data:ko.toJSON(auteur,null,2),
            type: "PUT",
            contentType: "application/json",
            headers: {
                Accept: "application/json"
            }
        }).done(function (data) {
            getData();
            alert("L'auteur a été modifié.");
        });
    };
   
    self.add = function () {
        var cat = ko.toJSON(self.auteur2,null,2);
        delete cat.id;
        console.log(cat);
        //self.categories.create(categorie);
        $.ajax({
            url: "http://localhost:8080/bibliotheque_ntdp/webresources/fr.unice.miage.ntdp.bibliotheque.auteur",
            type: "POST",
            data:ko.toJSON(self.auteur2,null,2),
            contentType: "application/json",
            headers: {
                Accept: "application/json"
            }
        }).done(function (data) {
            alert("L'auteur a été enregistré.");
            $('#dtype').val('');
            $('#datedenaissance').val(''); 
             $('#email').val(''); 
              $('#nom').val(''); 
               $('#photo').val(''); 
                $('#prenom').val(''); 
                 $('#sexe').val('');
                  $('#aproposde').val(''); 
                   $('#nationalite').val(''); 
        });
    };
};
/*
 * To change this license header, choose License Headers in Project Properties.
  To change this template file, choose Tools | Templates
  and open the template in the editor.
 */
var newAuteur = function () {
    var viewModel = new ViewModel();
    viewModel.initWithEmptyAuteur();
    ko.applyBindings(viewModel);
};

/*var getData = function () {
    $.ajax({
        url: "http://localhost:8080/bibliotheque_ntdp-master/webresources/fr.unice.miage.ntdp.bibliotheque.categorie",
        type: "GET",
        headers: {
            Accept: "application/json"
        },
        success: (function (data, status, jq) {
//Cette fonction indique à knockout d'appliquer les données aux éléments de la page   
//Elle est toujours appelée quand les données sont pretes et est appelée qu'une fois  
            var cat = ko.toJSON(data, null, 2);
            console.log(cat);
            ko.applyBindings(new ViewModel(data));
        })
    });
};*/
function getDataAuteur() {
    
    $.ajax({
        url: "http://localhost:8080/bibliotheque_ntdp/webresources/fr.unice.miage.ntdp.bibliotheque.auteur",
        type: "GET",
        headers: {
            Accept: "application/json"
        }
    }).done(function (data) {
        //alert('ok');
        ko.applyBindings(new ViewModel(data));
    });
}

function remove(auteur) {
    self.auteurs.remove(auteur.id());
    $.ajax({
        url: "http://localhost:8080/bibliotheque_ntdp/webresources/fr.unice.miage.ntdp.bibliotheque.auteur",
        type: "DELETE",
        contentType: "application/json",
        headers: {
            Accept: "application/json"
        }
    }).done(function (data) {
        //alert('ok');
        self.auteurs.remove(auteur.id());
    });
}



/*.success(function(data, status, jq) {  
 //Cette fonction indique à knockout d'appliquer les données aux éléments de la page   
 //Elle est toujours appelée quand les données sont pretes et est appelée qu'une fois   
 ko.applyBindings(new ViewModel(data));  
 }).error(function(jq, status, error) {  
 $(".error").text(JSON.stringify(status + " " + error));  
 
 }); */
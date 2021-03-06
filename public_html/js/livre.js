/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* 
 Ceci est equivalent à une classe Java, on veut faire propre! 
 */
/* global ko, self */

var Livre = function (livre) {
    this.id = ko.observable(livre.id);
    this.ISBN = ko.observable(livre.ISBN);
   /* this.photo = ko.observable(livre.photo);*/
    
    this.quantite = ko.observable(livre.quantite);
   /* this.publishddate = ko.observable(livre.publishddate);*/
    this.titre = ko.observable(livre.titre);
    
    this.resume = ko.observable(livre.resume);
    
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
var ViewModel = function (livres) {
    var self = this;
    self.initWithEmptyLivre = function(){
        self.livre = new Livre({
            
        });
    };
    //
 //représente la liste des catégories  
    //La fonction prend la réponse obtenue du serveur en paramètre  
    //Ici nous supposons que vous avez chargé la liste des catégories  
    //ko.utils.arrayMap itère sur la collection et pour chaque objet trouvé, elle crée une instance de categorie   
    self.livres = ko.observableArray(ko.utils.arrayMap(livres, function (livre) {
        return new Livre(livre);
    }));

    self.remove = function (livre) {
        self.livres.remove(livre);
        $.ajax({
            url: "http://localhost:8080/bibliotheque_ntdp/webresources/fr.unice.miage.ntdp.bibliotheque.livre/"+livre.id(),
            type: "DELETE",
            contentType: "application/json",
            headers: {
                Accept: "application/json"
            }
        }).done(function (data) { 
            
            self.livres.remove(livre);
            alert("Le livre a été supprimé.");
        });
    };
    self.update = function (livre) {
        self.livres.replace(livre.id(), livre.id());
        $.ajax({
            url: "http://localhost:8080/bibliotheque_ntdp/webresources/fr.unice.miage.ntdp.bibliotheque.livre/"+livre.id(),
            data:ko.toJSON(livre,null,2),
            type: "PUT",
            contentType: "application/json",
            headers: {
                Accept: "application/json"
            }
        }).done(function (data) {
            getData();
            alert("Le livre a été modifié.");
        });
    };
   
    self.add = function () {
        var cat = ko.toJSON(self.livre,null,2);
        delete cat.id;
        console.log(cat);
        //self.categories.create(categorie);
        $.ajax({
            url: "http://localhost:8080/bibliotheque_ntdp/webresources/fr.unice.miage.ntdp.bibliotheque.livre",
            type: "POST",
            data:ko.toJSON(self.livre,null,2),
            contentType: "application/json",
            headers: {
                Accept: "application/json"
            }
        }).done(function (data) {
            alert("Le livre a été enregistré.");
            $('#ISBN').val('');
           
            
          
            $('#quantite').val('');
            
             $('#resume').val('');
            $('#titre').val('');
        });
    };
};
/*
 * To change this license header, choose License Headers in Project Properties.
  To change this template file, choose Tools | Templates
  and open the template in the editor.
 */
var newLivre = function () {
    var viewModel = new ViewModel();
    viewModel.initWithEmptyLivre();
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
function getData() {
    
    $.ajax({
        url: "http://localhost:8080/bibliotheque_ntdp/webresources/fr.unice.miage.ntdp.bibliotheque.livre",
        type: "GET",
        headers: {
            Accept: "application/json"
        }
    }).done(function (data) {
        //alert('ok');
        ko.applyBindings(new ViewModel(data));
    });
}

function remove(livre) {
    self.livres.remove(livre.id());
    $.ajax({
        url: "http://localhost:8080/bibliotheque_ntdp/webresources/fr.unice.miage.ntdp.bibliotheque.livre",
        type: "DELETE",
        contentType: "application/json",
        headers: {
            Accept: "application/json"
        }
    }).done(function (data) {
        //alert('ok');
        self.livres.remove(livre.id());
    });
}



/*.success(function(data, status, jq) {  
 //Cette fonction indique à knockout d'appliquer les données aux éléments de la page   
 //Elle est toujours appelée quand les données sont pretes et est appelée qu'une fois   
 ko.applyBindings(new ViewModel(data));  
 }).error(function(jq, status, error) {  
 $(".error").text(JSON.stringify(status + " " + error));  
 
 }); */
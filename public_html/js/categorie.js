/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* 
 Ceci est equivalent à une classe Java, on veut faire propre! 
 */
/* global ko, self */

var Category = function (categorie) {
    this.id = ko.observable(categorie.id);
    this.nom = ko.observable(categorie.nom);
    this.description = ko.observable(categorie.description);
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
var ViewModel = function (categories) {
    var self = this;
    self.initWithEmptyCategory = function(){
        self.category = new Category({
            
        });
    };
    //
 //représente la liste des catégories  
    //La fonction prend la réponse obtenue du serveur en paramètre  
    //Ici nous supposons que vous avez chargé la liste des catégories  
    //ko.utils.arrayMap itère sur la collection et pour chaque objet trouvé, elle crée une instance de categorie   
    self.categories = ko.observableArray(ko.utils.arrayMap(categories, function (categorie) {
        return new Category(categorie);
    }));

    self.remove = function (categorie) {
        self.categories.remove(categorie);
        $.ajax({
            url: "http://localhost:8080/bibliotheque_ntdp/webresources/fr.unice.miage.ntdp.bibliotheque.categorie/"+categorie.id(),
            type: "DELETE",
            contentType: "application/json",
            headers: {
                Accept: "application/json"
            }
        }).done(function (data) { 
            
            self.categories.remove(categorie);
            alert("La catégorie a été supprimée.");
        });
    };
    self.update = function (categorie) {
        self.categories.replace(categorie.id(), categorie.id());
        $.ajax({
            url: "http://localhost:8080/bibliotheque_ntdp/webresources/fr.unice.miage.ntdp.bibliotheque.categorie/"+categorie.id(),
            data:ko.toJSON(categorie,null,2),
            type: "PUT",
            contentType: "application/json",
            headers: {
                Accept: "application/json"
            }
        }).done(function (data) {
            getData();
            alert("La catégorie a été modifiée.");
        });
    };
   
    self.add = function () {
        var cat = ko.toJSON(self.category,null,2);
        delete cat.id;
        console.log(cat);
        //self.categories.create(categorie);
        $.ajax({
            url: "http://localhost:8080/bibliotheque_ntdp/webresources/Categorie",
            type: "POST",
            data:ko.toJSON(self.category,null,2),
            contentType: "application/json",
            headers: {
                Accept: "application/json"
            }
        }).done(function (data) {
            alert("La catégorie a été enregistrée.");
            $('#nom').val('');
            $('#description').val('');            
        });
    };
};
/*
 * To change this license header, choose License Headers in Project Properties.
  To change this template file, choose Tools | Templates
  and open the template in the editor.
 */
var newCategory = function () {
    var viewModel = new ViewModel();
    viewModel.initWithEmptyCategory();
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
        url: "http://localhost:8080/bibliotheque_ntdp/webresources/Categorie",
        type: "GET",
        headers: {
            Accept: "application/json"
        }
    }).done(function (data) {
        //alert('ok');
        ko.applyBindings(new ViewModel(data));
    });
}

function remove(categorie) {
    self.categories.remove(categorie.id());
    $.ajax({
        url: "http://localhost:8080/bibliotheque_ntdp/webresources/Categorie",
        type: "DELETE",
        contentType: "application/json",
        headers: {
            Accept: "application/json"
        }
    }).done(function (data) {
        //alert('ok');
        self.categories.remove(categorie.id());
    });
}



/*.success(function(data, status, jq) {  
 //Cette fonction indique à knockout d'appliquer les données aux éléments de la page   
 //Elle est toujours appelée quand les données sont pretes et est appelée qu'une fois   
 ko.applyBindings(new ViewModel(data));  
 }).error(function(jq, status, error) {  
 $(".error").text(JSON.stringify(status + " " + error));  
 
 }); */
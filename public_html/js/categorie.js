var getData = function() {  
    $.ajax({  
        url: "http://localhost:8080/bibliotheque_ntdp/webresources/categorie",  
                type: "GET",  
        headers: {  
            Accept: "application/json"  
        }  
    }).done(function(data, status, jq) {  
//Cette fonction indique à knockout d'appliquer les données aux éléments de la page   
//Elle est toujours appellée quand les données sont pretes et est appelée qu'une fois   
        ko.applyBindings(new ViewModel(data));  
    })//.error(function(jq, status, error) {  
        //$(".error").text(JSON.stringify(status + " " + error));  
  
    //});  
}; 

var Category = function(categorie) {  
                this.id = ko.observable(categorie.id);  
                this.nom = ko.observable(categorie.nom);  
                this.description = ko.observable(categorie.description);  
            };
    
 var ViewModel = function(categories) {  
     var self = this; 
      self.initWithEmptyCategory = function(){
      self.category = new Category({
          
      });
    };
    
     self.categories = ko.observableArray(ko.utils.arrayMap(categories, function(categorie) {
         return new Category(categorie);}));
     
     self.remove = function(categorie){
                   self.categories.remove(categorie);
                    $.ajax({
                        url: "http://localhost:8080/bibliotheque_ntdp/webresources/categorie/"+categorie.id(),
                        type: "DELETE",
                        contentType: "application/json",
                  
                        headers: {
                        Accept : "application/json"
                    }
                    }).done(function(data) {                       
                        self.categories.remove(categorie);
                    });
                };
       
    self.update = function(categorie){ 
                    self.categories.replace(categorie.id(), categorie.id());
                    $.ajax({
                        url: "http://localhost:8080/bibliotheque_ntdp/webresources/categorie/"+categorie.id(),
                        data: ko.toJSON(categorie, null,2),
                        type: "PUT",
                        contentType: "application/json",
                  
                        headers: {
                        Accept : "application/json"
                    }
                    }).done(function(data) {                        
                        getData();
                    });
                       
                };
       self.add = function(){ 
                    var cat = ko.toJSON(self.category,null,2);
                     delete  cat.id;
                   // self.categories.create(category);
                    $.ajax({
                        url: "http://localhost:8080/bibliotheque_ntdp/webresources/categorie",
                        data:ko.toJSON(self.category, null,2),
                        type: "POST",
                        contentType: "application/json",
                  
                        headers: {
                        Accept : "application/json"
                    }
                    }).done(function(data) {
                        //alert("status");
                        //self.categories.remove(categorie);
                        getData();
                    });
                       
                };
    };
    
    
    var newCategory = function(){
        var viewModel = new ViewModel();
        viewModel.initWithEmptyCategory();
        ko.applyBindings(viewModel);
    };
    
   
    
    
    

 
 
  function showEdit(page) {
      $('#Shadowx').css('height', $(window).height() + 'px').fadeIn('fast', function() {
      $('#LoadAjax').load(page).fadeIn('slow');
    });
  }                                            
          
             
 function hideEdit() {
   $('#LoadAjax').hide();
   $('#Shadowx').hide();
   $('#viewPage').hide();
}
      
   
    
    
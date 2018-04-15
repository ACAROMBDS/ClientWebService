var getData = function() {  
    $.ajax({  
        url: "http://localhost:8080/bibliotheque_ntdp/webresources/livre", 
                type: "GET",  
        headers: {  
            Accept: "application/json"  
        }  
    }).done(function(data, status, jq) { 
        ko.applyBindings(new ViewModel(data));  
    });
}; 

var Livre = function(livre) {  
                this.id = ko.observable(livre.id);  
                this.isbn = ko.observable(livre.isbn);  
                this.photo = ko.observable(livre.photo);
                this.publishedDate = ko.observable(livre.publishedDate);  
                this.quantite = ko.observable(livre.quantite);
                this.resume = ko.observable(livre.resume);  
                this.titre = ko.observable(livre.titre);
            };
    
 var ViewModel = function(livre) {  
     var self = this; 
     self.livre = ko.observableArray(ko.utils.arrayMap(livre, function(livre) {
         return new Livre(livre);}));
     
     self.remove = function(livre){
                   self.livre.remove(livre);
                    $.ajax({
                        url: "http://localhost:8080/bibliotheque_ntdp/webresources/livre/"+livre.id(),
                        type: "DELETE",
                        contentType: "application/json",
                  
                        headers: {
                        Accept : "application/json"
                    }
                    }).done(function(data) {                       
                        self.livre.remove(livre);
                    });
                };
       
    self.update = function(livre){ 
                    self.livre.replace(livre.id(), livre.id());
                    $.ajax({
                        url: "http://localhost:8080/bibliotheque_ntdp/webresources/livre/"+livre.id(),
                        data: ko.toJSON(livre, null,2),
                        type: "PUT",
                        contentType: "application/json",
                  
                        headers: {
                        Accept : "application/json"
                    }
                    }).done(function(data) {                        
                        getData();
                    });                       
                };
       self.add = function(livre){ 
                    self.livre.create(livre);
                    $.ajax({
                        url: "http://localhost:8080/bibliotheque_ntdp/webresources/livre",
                        data: ko.toJSON(livre, null,2),
                        type: "POST",
                        contentType: "application/json",
                  
                        headers: {
                        Accept : "application/json"
                    }
                    }).done(function(data) {                        
                        getData();
                    });
                       
                };
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
      
   
    
    



function intTable() {
    $('.dataTable').DataTable({
        "scrollX": false,
        "scrollCollapse": true,
        "paging": true,
        "deferRender": true,
        "bsort": false,
        "language": {
            "search": "Recherche:",
            "paginate": {
                "first": "Première",
                "last": "Dernière",
                "next": "Suivant",
                "previous": "Précédent"
            },
            "zeroRecords": "Aucun enregistrements correspondants trouvés",
            "emptyTable": "Pas de données disponibles dans le tableau",
            "info": "Affichage _START_ à _END_ sur _TOTAL_ entrée",
            "infoEmpty": "Affichage 0 sur 0 entrées",
            "lengthMenu": "Affichage _MENU_ entrée",
            "loadingRecords": "Chargement...",
            "processing": "Traitement..."
        }
    });

    $("#dialog-confirm").hide();
}


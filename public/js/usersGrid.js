$(function() {

    $("#jsGrid").jsGrid({
        height: "85%",
        width: "100%",
        filtering: false,
        inserting: false,
        editing: false,
        sorting: true,
        paging: true,
        autoload: true,
        pageSize: 50,
        pageButtonCount: 5,
        deleteConfirm: "Do you really want to delete client?",
        controller: {
            loadData: function() {
                var d = $.Deferred();
 
                $.ajax({
                    url: "/api/users",
                    dataType: "json"
                }).done(function(response) {
                    d.resolve(response.data);
                });
 
                return d.promise();
            }
            /*loadData: function(filter) {
                return $.ajax({
                    type: "GET",
                    url: "/api/users",
                    data: filter
                });
            } ,
            insertItem: function(item) {
                return $.ajax({
                    type: "POST",
                    url: "/api/users",
                    data: item
                });
            },
            updateItem: function(item) {
                return $.ajax({
                    type: "PUT",
                    url: "/api/users",
                    data: item
                });
            },
            deleteItem: function(item) {
                return $.ajax({
                    type: "DELETE",
                    url: "/api/users",
                    data: item
                });
            } */
        },
        fields: [
            { name: "name", width: 120, title: "Name" },
            { name: "email", width: 180, title: "Email"},
            { name: "gender", width: 50, title: "Gender" },
            { name: "birthday", width: 100, title: "Birthday"},
            { name: "created_at", width: 150, title: "Created on" },
            { name: "updated_at", width: 150, title: "Updated on" },            
        ]
    });

    $("#sort").click(function() {
        var field = $("#sortingField").val();
        $("#jsGrid").jsGrid("sort", field);
    });
    
});
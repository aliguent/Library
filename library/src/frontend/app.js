var app = angular.module('tableApp', []);
app.controller('controllerApp', function ($scope, $window, $http) {

    $http.get("/api/library")
        .then(function(response) {
            console.log(response);
            $scope.Booklist = response.data
        });

    $scope.Lend = function(index){
        var book = $scope.Booklist[index];
        console.log(book);
        $http.patch("/api/library/lend", {id:book._id, lentBy:book.lentBy})
            .then(function (response) {
                if(response.status===204) {
                    console.log(response);
                    $scope.Booklist[index].lent = true;
                }
                else {
                    console.log("Something went wrong!")
                }
            });
    };

    $scope.Return = function(index){
        var book = $scope.Booklist[index];
        $http.patch("/api/library/return/"+book._id)
            .then(function (response) {
                if (response.status === 204) {
                    console.log(response);
                    $scope.Booklist[index].lent = false;
                    $scope.Booklist[index].lentBy = "";
                } else {
                    console.log("Something went wrong!")
                }
            });
    };


    $scope.Add = function () {
        //Add the new item to the Array.
        var book = {};
        book.title = $scope.title;
        book.author = $scope.author;
        book.description = $scope.description;
        book.year = $scope.year;
        $http.post("/api/library/addbook", book)
            .then(function (response) {
                console.log(response);
                $scope.Booklist.push(response.data);
            });
        //Clear the TextBoxes.
        $scope.title = "";
        $scope.author = "";
        $scope.description = "";
        $scope.year = "";
        $scope.lent = "";
    };


    $scope.Delete = function (index) {
        var book = $scope.Booklist[index];
        if ($window.confirm("Do you want to delete: " + book.title + "?")) {
            $http.delete("/api/library/delete/"+book._id)
                .then(function(response) {
                    if(response.status===204) {
                        console.log(response);
                        $scope.Booklist.splice(index, 1);
                    }
                    else {
                        console.log("Something went wrong!")
                    }
                });
        }
    }
});
var app = angular.module("app", ["ngMaterial"]);

app.controller("MainController", ["$scope", "$http", function($scope, $http) {

	var main = this;

	main.downloadAlert = function(ev){

    $mdDialog.show({
      title: "Before downloading please fill out these questions"
      templateUrl: 'downloadtemplate.html',
      clickOutsideToClose:true
    })
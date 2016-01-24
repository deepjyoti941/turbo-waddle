"use strict";


angular.module('app').factory('bookFactory',
    ['servicesConfig', '$http', '$location', '$q',
        function (servicesConfig, $http, $location, $q) {

            var API_URL = servicesConfig.API_URL;

            var factories = {
                getBooks: getBooks
            }

            return factories;

            function getBooks() {
                return $http.get(API_URL+'?type=json&query=list_books')
                    .then(bookList);

                function bookList(data, status, headers, config) {
                    return data.data;
                }
            }
        }
    ]);
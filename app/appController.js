"use strict";


angular.module('app').controller('mainCtrl',
    ['$scope','bookFactory','$localStorage',
        function ($scope, bookFactory, $localStorage) {

            $scope.isReadonly = true; // default test value
            $scope.changeOnHover = true; // default test value
            $scope.maxValue = 5; // default test value

            $scope.sortType = 'name'; // set the default sort type
            $scope.sortReverse = false;  // set the default sort order
            $scope.searchNameAuthorRating = '';     // set the default search/filter term

            var listBookmarks = [];

            $scope.setSortType = function(type) {
                $scope.sortType == type.text;
            }

            bookFactory.getBooks().then(function(data) {
                $scope.books = data.books;
                $scope.book = $scope.books[0];
                $scope.selectedBook = function(book) {
                    $scope.book = book;
                }
            });

            $scope.bookmark = function(book) {
                listBookmarks.push(book)
                $localStorage.bookmarks = listBookmarks;
            }

            $scope.listBookmarks = function() {
                if(!$localStorage.bookmarks) $scope.noBookmarks = true;
                else {
                    $scope.noBookmarks = false;
                    $scope.books = $localStorage.bookmarks;
                    $scope.book = $scope.books[0];
                }
            }

            $scope.clearBookmark = function() {
                if($localStorage.bookmarks.length == 0) $scope.noBookmarks = true;
                $scope.listBookmarks = [];
                $localStorage.bookmarks = listBookmarks;
            }

            $scope.bookmarkCount = function() {
                if($localStorage.bookmarks) return $localStorage.bookmarks.length;
                else return 0;

            }

        }
    ]);
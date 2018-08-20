angular.module('app')
.service('transactionService', function($http) {
    this.getTransactions = function() {
        return $http.get('/api/v1/users/me/transactions')
        .then(function(response) {
            return response.data.transactions
        })
    }
})

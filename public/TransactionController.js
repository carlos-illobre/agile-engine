angular.module('app')
.controller('TransactionController', function(transactionService) {

    const vm = this

    transactionService.getTransactions().then(function(transactions) {
        vm.transactions = transactions
    })

})
.filter('transactionSummary', function() {
    return function(transaction) {
        return transaction.type + ' ' + transaction.amount
    }
})

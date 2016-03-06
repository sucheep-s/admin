myApp.factory('FoodService', function($http){
  var factory = {};

  factory.getCategory = function(accountId){
    return $http.get('api/getCategory.php');
  };

  factory.getFood = function(catId){
    return $http.get('api/getFood.php', {
        params:{ "catId": catId }
      });
  };

  factory.addCategory = function(cat){
    return $http.post('api/addCategory.php', $.param(cat),
     {
         headers:
         {
             'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
         }
     });
  };

  factory.addFood = function(food){
    return $http.post('api/addFood.php', $.param(food),
     {
         headers:
         {
             'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
         }
     });
  };

  factory.editCategory = function(cat){
    return $http.post('api/editCategory.php', $.param(cat),
     {
         headers:
         {
             'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
         }
     });
  };

  factory.editFood = function(food){
    return $http.post('api/editFood.php', $.param(food),
     {
         headers:
         {
             'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
         }
     });
  };

  factory.deleteFood = function(food){
    return $http.post('api/deleteFood.php', $.param(food),
     {
         headers:
         {
             'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
         }
     });
  };

  return factory;
});

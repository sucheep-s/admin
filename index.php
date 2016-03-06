<!DOCTYPE html>
<html ng-app="myApp">
  <head>
    <meta charset="utf-8">
    <title></title>
    <!-- build:css assets/css/main.css -->
    <link href='assets/css/bootstrap.min.css' rel='stylesheet' type='text/css'>
    <link href='assets/css/font-awesome.min.css' rel='stylesheet' type='text/css'>
    <link href='assets/css/style.css' rel='stylesheet' type='text/css'>
    <!-- endbuild -->
  </head>
  <body>
    <div id="wrapper">
      <nav class="navbar navbar-inverse" ng-init="navCollapsed = true">
        <div class="container-fluid">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
              <button type="button" class="navbar-toggle collapsed" ng-click="navCollapsed = !navCollapsed" aria-expanded="false">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
              <a class="navbar-brand">
                <img class="brand-img" src="assets/images/logo.png">
              </a>
              <div class="brand-text">Content Management System</div>
            </div>
            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" uib-collapse="navCollapsed">
              <ul class="nav navbar-nav navbar-right" >
    	            <li ng-show="navCollapsed" class="dropdown" uib-dropdown>
    	                <a href="#" class="dropdown-toggle" uib-dropdown-toggle><i class="fa fa-cog fa-lg"></i></a>
    	                <ul class="dropdown-menu" uib-dropdown-menu role="menu">
    	                    <li class="m_2"><a href="#" ng-click="logout()"><i class="fa fa-lock"></i> Logout</a></li>
    	                </ul>
    	            </li>
                  <li ng-show="!navCollapsed">
                    <a href="#" ng-click="logout()"><i class="fa fa-lock"></i> Logout</a>
                  </li>
    	        </ul>
            </div><!-- /.navbar-collapse -->
          </div><!-- /.container-fluid -->
      </nav>
      <div ui-view></div>
    </div>
    <!-- build:js assets/js/main.js -->
    <script src="assets/js/jquery-1.11.2.min.js"></script>
    <script src="assets/libs/angular/angular.js"></script>
    <script src="assets/libs/angular-animate/angular-animate.js"></script>
    <script src="assets/libs/angular-ui-router/release/angular-ui-router.js"></script>
    <script src="assets/libs/angular-bootstrap/ui-bootstrap.js"></script>
    <script src="assets/libs/angular-bootstrap/ui-bootstrap-tpls.js"></script>
    <script src="assets/js/app.js"></script>
    <!-- endbuild -->
  </body>
</html>

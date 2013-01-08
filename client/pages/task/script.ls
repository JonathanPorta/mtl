controller = !($scope, appService) ->
	$scope <<<
		property: value
		fn = !->
			appService.doSomething!

angular.module \mtl
	.controller \task, [\$scope, \AppService, controller]

angular.classmap do
	semantic: "row"
	fields: "span6 btn btn-block btn-primary"
	controls: "span6 btn btn-block"

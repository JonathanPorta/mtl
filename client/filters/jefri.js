(function(){
	// Prepare a function to perform filters given a set of parameters.
	var filterFn = function(params, strict){
		if(false !== strict)
		{
			strict = true;
		}
		// Return a function that handles the actual filtering.
		return function(entities){
			var matches = [];
			entities.forEeach(function(entity){
				var isMatch = false;
				for(var field in params)
				{
					if(strict)
					{
						isMatch = isMatch || (entity[field]() === params[field])
					}
					else
					{
						var searchValue = params[field] || "";
						var value = entity[field]();
						var valueUpper = value.toUpperCase();
						if(valueUpper.indexOf(searchValue.toUpperCase()) > -1)
						{
							isMatch = isMatch || true;
						}
					}
				}
				if(isMatch)
				{
					matches.push(entity);
				}
			}
		}
	}

	angular.module('mtl').filter('jefri', function($filter) {
		return function(entities, params){
			var strict = true,
			    single = false;
			if(params.hasOwnProperty("_strict"))
			{
				strict = params["_strict"];
				delete params["_strict"];
			}

			if(!(entities instanceof Array))
			{
				entities = [entities];
				single = true
			}

			var filter = filterFn(params, strict);
			var matches = filter(entities);

			return single ? matches[0] : matches
		};
	});
}).call(this);

(function(){
	angular.module('mtl').filter('jefri', function($filter) {
		return function(entities, params){
			var strict = true;
			if(params.hasOwnProperty("_strict"))
				strict = params["_strict"];
			if(entities instanceof Array)
			{	//Loop through and call filter on each.
				var matches = [];
				for(var i=0; i<entities.length; i++){
					var e = $filter("jefri")(entities[i], params);
					if(e)
						matches.push(e);
				}
				return matches;
			}
			else
			{	//Do actual figurin' here.
				//Just so we don't forget it is just one...
				var entity = entities;
				var isMatch = false;
				for(var field in params)
				{
					if(field == "_strict")
						break;

					switch(strict)
					{
						case true:
							if(entity[field]() == params[field])
							{
								isMatch = true;
							}
							else
							{
								isMatch = false;
							}
						break;
						case false:
							var searchValue = params[field] || "";
							var value = entity[field]();
							var valueUpper = value.toUpperCase();
							if(valueUpper.indexOf(searchValue.toUpperCase()) > -1)
								isMatch = true;
						break;
					}
				}
				if(isMatch)
					return entity;
			}
		};
	});
}).call(this);

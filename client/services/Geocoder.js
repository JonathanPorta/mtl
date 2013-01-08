//
(function(){
	angular.module('mtl').factory('Geocoder', function(){
		var Geocoder = function(){
			var self = this;
			self.gc = new google.maps.Geocoder();
			self.levels = {"country" : "country", "state" : "administrative_area_level_1", "county" : "administrative_area_level_2", "city" : "locality"};
		};

		Geocoder.prototype.gc = function(){};

		//Perform the Geocode/Reverse Geocode
		Geocoder.prototype.lookup = function(coords, callback){
			//TODO: Implement lookup cache to decrease # of queries
			var self = this;
			var payload = {};

			if(typeof coords == "String")
			{	//Looking up address
				payload['address'] = coords;
			}
			else
			{	//Has to be LatLng obj.
				payload['latLng'] = coords;
			}

			self.gc.geocode(payload, function(results, status){
				if(status == google.maps.GeocoderStatus.OK)
				{	//Got a response
					console.log("Geocoder Response", results);
					callback(results);
				}
				else
				{	//Screwed...
					console.warn("Geocoder FAILED", results, status);
				}
			});
		
		};

		//Perform Geocode/Reverse Geocode only returning the name of the "level" specified
		Geocoder.prototype.level = function(level, coords, callback){
		//level matches the Google Maps return value for w/e they are looking up
			var self = this;
			//TODO: Allow long or short to be picked.
			var form = "long_name";
			var l = self.levels[level];

			self.lookup(coords, function(results){
				var result = []
				for(var i in results)
				{
					if(results[i].types.indexOf(l) > -1)
					{
						var acs = results[i]["address_components"];
						for(var x in acs)
						{
							if(acs[x].types.indexOf(l) > -1)
							{
								result[0] = acs[x];
								break;
							}
						}
					}
				}
				if(result.length > 0)
				{
					callback(result[0][form]);
				}
				else
				{
					console.warn("Unable to resolve " + level + " for coords:", coords);
				}
			});
		};

		return new Geocoder();
	});
}).call(this);

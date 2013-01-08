//
(function(){
	angular.module('mtl').factory('mtl', function(JEFRi, herald){
		var mtl = function(){
			var self = this;

			JEFRi.ready.then(function(){
				self.load();
			});
		};

		mtl.prototype.legislators = [];
		mtl.prototype.exceptions = [];

		mtl.prototype.load = function(){
			//Dummy Data!
			this.create("Legislator", {name : "1215 Harney"});
			this.create("Legislator", {name : "3528 Carmel"});
			this.create("Legislator", {name : "233 Ashley Ct N"});
			this.create("Legislator", {name : "1213 Concord"});

			console.log("mtl load");
			herald.trigger("load");
		};

		mtl.prototype.getLegislators = function(){
			return this.legislators;
		};

		mtl.prototype.lookup = function(type, id){
			return JEFRi.find({"_type" : type, "legislator_id" : id});
		};

		mtl.prototype.create = function(type, spec){
			var spec = spec || {};
			if(type == "Legislator")
			{
				var l = JEFRi.build("Legislator", spec);
				this.legislators.push(l);
				return l;
			}
//			else if(type == "Exception")
//			{
//				var e = JEFRi.build("Exception", spec);
//				this.exceptions.push(e);
//				return e;
//			}
		};

		mtl.prototype.save = function(){

		};

		return new mtl();
	});
}).call(this);

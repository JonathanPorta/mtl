AppService = (JEFRi)->
	class AppService
		->
			JEFRi.ready.then !~>
				@load!

		load: ->
			JEFRi.get {_type: "AppEntity"} .then !(gotten)~>
				@entities = gotten
				@loaded <: @entities

		save: ->
			JEFRi.save @entities

		entities: []

	new AppService!

angular.module \mtl

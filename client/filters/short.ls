Short = ->
	(id)->
		"(#{id.substring 0, 8})"

angular.module \mtl
	.filter \shortId, Short


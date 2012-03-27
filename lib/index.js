var mixpanel = require('mixpanel');

exports.plugin = function(router, params) {

	var p = this.params(),
	client = new mixpanel.Client(p.mixpanel.token);


	var trackers = {

		event: function(query) {

			client.track(query.event, query.data);

		},

		nameTag: function() {


		}


	}


	router.on({

		'push track': function(query) {

			for(var key in query) {
				var track = trackers[key];

				if(track) {
					track(query);
				}
			}
		}
	})
}
var mixpanel = require('mixpanel');

exports.plugin = function(router, params) {

	var p = this.params();

	if(!p.mixpanel) return;


	var client = new mixpanel.Client(p.mixpanel.token),
	_id        = String(new Date());


	var trackers = {

		event: function(query) {

			var data = query.data || {};

			data.distinct_id = data._id || _id;


			client.track(query.event, data, function(err) {
				
			});

		},

		nameTag: function() {


		}


	}


	router.on({

		/**
		 */

		'push track': function(query) {

			for(var key in query) {
				var track = trackers[key];


				if(track) {
					track(query);
				}
			}
		}
	});
}
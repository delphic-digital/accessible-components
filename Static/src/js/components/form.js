define(['jquery', './common/events', './common/aria'],function($, events, aria) {

	return {

		settings: {
			$form: $('.form')
		},

		init: function() {
			var _ = this;

			aria.bindForm(_.settings.$form);
		},

		destroy: function() { }
	};
});
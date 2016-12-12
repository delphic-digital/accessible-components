define(['jquery', './common/events', './common/aria'],function($, events, aria) {

	return {

		settings: {
			$accordion: $('.accordion'),
			$tab: $('.accordion__tab'),
			$panel: $('.accordion__panel')
		},

		init: function() {
			var _ = this;

			_.bindAria();
			_.initEvents();
		},

		bindAria: function() {
			var _ = this;
			aria.bindAccordion(_.settings.$accordion, _.settings.$tab, _.settings.$panel);
		},

		initEvents: function() {
			var _ = this;

			_.settings.$tab.off().on('click keydown', function(e) {
				let $clickedTab = $(this);
				let $panel = _.settings.$panel;

				if ( e.type == 'click' ) {
					events.openSlide($clickedTab,$panel,'.accordion__icon');
				} else {
					switch(e.keyCode) {
						// enter or spacebar
						case 13:
						case 32:
						events.openSlide($clickedTab,$panel,'.accordion__icon');
						break;

						// up or left arrow keys
						case 37:
						case 38:
						events.goPrev($clickedTab);
						break;

						// down or right arrow keys
						case 39:
						case 40:
						events.goNext($clickedTab);
						break;

						// tab
						case 9:
						//do nothing, functionality already there
						break;

						default:
						console.log('try another key');
						break;
					}
				}
			});
		},

		destroy: function() { }
	};
});
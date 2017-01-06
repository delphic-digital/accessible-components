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
				e.preventDefault();

				let $clickedTab = $(this).parent(); // a tag is nested within tab container, easier to deal with tab-container for events
				let $panel = _.settings.$panel;

				// click, enter, or spacebar
				// open/close the accordion tabs
				if ( e.type == 'click' || e.keyCode == 13 || e.keyCode == 32 ) {
					events.openSlide($clickedTab,$panel,'.accordion__icon');
				} 
				// left or up arrow keys
				// move focus to previous accordion tab
				else if ( e.keyCode == 37 || e.keyCode == 38 ) {
					events.goPrev($clickedTab);
				}
				// down or right arrow keys
				// move focus to next accordion tab
				else if ( e.keyCode == 39 || e.keyCode == 40 ) {
					events.goNext($clickedTab);
				}
				// CTRL + HOME key || CTRL + HOME NUMPAD key
				// move focus to first accordion tab
				else if ( e.keyCode == 36 && e.ctrlKey || e.keyCode == 103 && e.ctrlKey ) {
					events.goFirst($clickedTab);
				}
				// CTRL + END key || CTRL + END NUMPAD key
				// move focus to last accordion tab
				else if ( e.keyCode == 35 && e.ctrlKey || e.keyCode == 97 && e.ctrlKey ) {
					events.goLast($clickedTab);
				}
			});

			_.settings.$panel.off().on('keydown', function(e) {
				// CTRL + up arrow key
				// when in accordion panel, move focus to related accordion tab
				// if ( e.keyCode == 36 && e.ctrlKey ) {
				// 	events.goRelated($(this));
				// }
			});
		},

		destroy: function() { }
	};
});
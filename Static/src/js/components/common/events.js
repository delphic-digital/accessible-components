define(['jquery', 'velocity', './aria'],function($, velocity, aria) {

	return {

		settings: {
		},

		init: function() {
		},

		openSlide: function(tab, panel, icon) {
			var _ = this,
				tabLink = tab.children('a'),
				isOpen = tab.next(panel).is(':visible'),
				slideDir = isOpen ? 'slideUp' : 'slideDown';

			tab.next(panel).velocity(slideDir, {
				easing: 'easeOutQuart', 
				duration: 300
			});
			tab.find(icon).toggleClass('open');

			if ( tab.find(icon).hasClass('open') ){
				aria.setAriaVisible(tabLink);
			} else {
				aria.setAriaHidden(tabLink);
			}
		},

		goPrev: function(tab) {
			let $id = '#' + tab.parents('.accordion').attr('id') + ' .accordion__tab';
			let index = $($id).index(document.activeElement) - 1;
			if (index >= $($id).length) index = 0;
			$($id).eq(index).focus();
		},

		goNext: function(tab) {
			let $id = '#' + tab.parents('.accordion').attr('id') + ' .accordion__tab';
			let index = $($id).index(document.activeElement) + 1;
			if (index >= $($id).length) index = 0;
			$($id).eq(index).focus();
		},

		goRelated: function(sibling) {
			sibling.prev('.accordion__tab').focus();
		},

		goFirst: function(tab) {
			let firstTab = "." + tab.attr('class') + ":first a";
			$(firstTab).focus();
		},

		goLast: function(tab) {
			let lastTab = "." + tab.attr('class') + ":last a";
			$(lastTab).focus();
		},

		destroy: function() { }
	};
});
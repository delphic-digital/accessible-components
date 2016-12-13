define(['jquery', './aria'],function($, aria) {

	return {

		settings: {
		},

		init: function() {
		},

		openSlide: function(tab, panel, icon) {
			var _ = this;
			tab.next(panel).slideToggle(300);
			tab.children(icon).toggleClass('open');

			if ( tab.children(icon).hasClass('open') ){
				aria.setAriaVisible(tab);
			} else {
				aria.setAriaHidden(tab);
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

		destroy: function() { }
	};
});
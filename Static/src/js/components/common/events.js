define(['jquery', './aria'],function($, aria) {

	return {

		settings: {
		},

		init: function() {
		},

		openSlide: function(tab, panel, icon) {
			var _ = this;
			let tabLink = tab.children('a');

			tab.next(panel).slideToggle(300);
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
			let $parent = tab.parents('.accordion');
			let tabLink = tab.children('a');

			$parent.children(tab).first().children(tabLink).focus();
		},

		goLast: function(tab) {
			let $parent = tab.parents('.accordion');
			let tabLink = tab.children('a');
			console.log(tab.attr('class') + ':last');
			$parent.children(tab).last().children(tabLink).focus();
		},

		destroy: function() { }
	};
});
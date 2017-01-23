define(['jquery','onMediaQuery'],function($,MQ) {

	return {

		settings: {
			$mainNav: $('.main-nav__list')
		},

		init: function() {
			var _ = this;

			_.addQueries();
			_.sticky();

			$('.js-toggle').on('click', function() {
				var isOpen = _.settings.$mainNav.is(':visible'),
					slideDir = isOpen ? 'slideUp' : 'slideDown';

				$(this).toggleClass('active');
				_.settings.$mainNav.velocity(slideDir, {
					easing: 'easeOutQuart', 
					duration: 300
				});
			});
		},

		addQueries: function() {
			var _ = this;

			MQ.addQuery({
				context: ['mobile', 'tablet', 'desktop'],
				match: function() {
					_.bindExtraEvents();
				}
			});
		},

		bindExtraEvents: function() {
			var _ = this;
			currentContext = MQ.getContext();

			if (currentContext == 'tablet' || currentContext == 'desktop') {
				_.settings.$mainNav.css('display', 'block');
			} else {
				_.settings.$mainNav.css('display', 'none');
				$('.js-toggle').removeClass('active');
			}
		},

		sticky: function() {
			var _ = this;
			$(window).scroll(function() {
				var $navPos = $('.js-sticky-nav').offset().top;
				var $windowPos = $(window).scrollTop();
	    		if ($windowPos > $navPos){
	    			var width = $('.js-sticky-nav').innerWidth();
					$('.main-nav__js-wrapper').addClass('sticky-fixed');
					$('.main-nav__js-wrapper').css('width', width);
					_.fixedPosition();
	    		} else {
	    			$('.main-nav__js-wrapper').removeClass('sticky-fixed');
	    		}
			});
		},

		fixedPosition: function() {
			var marginL = $('.container').offset().left;
			$('.sticky-fixed').css("left",marginL);

			$(window).resize(function() {
				var marginL = $('.container').offset().left;
				$('.sticky-fixed').css("left",marginL);
			});
		},

		destroy: function() { }
	};
});
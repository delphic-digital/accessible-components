define(['jquery','onMediaQuery'],function($,MQ) {

	return {

		settings: {
		},

		init: function() {
			var _ = this;

			_.addQueries();
			_.sticky();

			$('.js-toggle').on('click', function() {
			  $(this).toggleClass('active');
			  $('.main-nav__list').slideToggle();
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
				$('.main-nav__list').css('display', 'block');
			} else {
				$('.main-nav__list').css('display', 'none');
				$('.js-toggle').removeClass('active');
			}
		},

		sticky: function() {
			var marginL = $('.container').offset().left;
			$('.sticky-fixed').css("marginLeft",marginL);

			$(window).resize(function() {
				var marginL = $('.container').offset().left;
			$('.sticky-fixed').css("marginLeft",marginL);
			});

			$(window).scroll(function() {
				var $navPos = $('.js-sticky-nav').offset().top;
				var $windowPos = $(window).scrollTop();
	    		if ($windowPos > $navPos){
	    			var width = $('.js-sticky-nav').innerWidth();
					$('.main-nav__js-wrapper').addClass('sticky-fixed');
					$('.main-nav__js-wrapper').css('width', width);
	    		} else {
	    			$('.main-nav__js-wrapper').removeClass('sticky-fixed');
	    		}
			});
		},

		destroy: function() { }
	};
});
/*globals jQuery, document */
(function ($) {
    "use strict";

    $(document).ready(function(){

    	// Setup pie charts (skills)

    	setupPie(); // On ready, initialize pies

		function setupPie() {
			$( '.skill-pie' ).easyPieChart( {
				barColor: '#066a55',
				trackColor: '#bbbbbb',
				scaleColor: false,
				lineWidth: 5,
				size: 120
			} );
		}

    	// Setup sliders

    	$('.skills').bxSlider({
			auto: true,
			autoStart: true,
			pause: 3000,
			controls: false,
			adaptiveHeight: true,
			touchEnabled: true,
			swipeThreshold: 80,
			slideMargin: 0
		});

    	$('.quotes').bxSlider({
			auto: true,
			autoStart: true,
			pause: 5000,
			controls: false,
			adaptiveHeight: true,
			touchEnabled: true,
			swipeThreshold: 80,
			slideMargin: 0
		});

		// Setup navigation (sticky, one page navigation)

    	$( '#nav' ).sticky( { topSpacing:0 } );
    	$( '#nav ul' ).onePageNav( { scrollSpeed: 400 } );

    	$(window).scroll(function() {
			var x = $(this).scrollTop();
			$('#header').css('background-position', '50% ' + (50 + parseInt(x / 15)) + '%');
		});

		// Portfolio sorter and lightbox initialization
		$( '.projects' ).mixitup( {
			targetSelector: '.project',	// Class required on each portfolio item
			filterSelector: '.filter', // Class required on each filter link
			effects: ['rotateZ'],
			easing: 'snap'
		} );

    	$('.gallery .project-wrap').each(function() { // the containers for all your galleries should have the class gallery
			$(this).magnificPopup({
				delegate: 'a', // the container for each your gallery items
				type: 'image',
				gallery:{enabled:true}
			});
		});

    });

}(jQuery));

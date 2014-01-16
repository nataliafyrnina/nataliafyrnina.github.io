jQuery(document).ready(function($){

	var nameDefault = 'Your name...';
	var emailDefault = 'Your email...';
	var messageDefault = 'Your message...';

	// Setting up existing forms

	setupforms();

	function setupforms() {
		// Applying default values
		setupDefaultText('#name',nameDefault);
		setupDefaultText('#email',emailDefault);
		setupDefaultText('#message',messageDefault);

		// Focus / Blur check against defaults
		focusField('#name');
		focusField('#email');
		focusField('#message');

		// Inserting the code image
		$( '#yenoh-pic-refresh' ).append( '<img src="assets/php/yenoh/yenoh.php" id="yenoh-pic" alt="Honey!">' );
	}

	function setupDefaultText(fieldID,fieldDefault) {
		$(fieldID).val(fieldDefault);
		$(fieldID).attr('data-default', fieldDefault);
	}

	function evalDefault(fieldID) {
		if($(fieldID).val() != $(fieldID).attr('data-default')) {
			return false;
		}
		else { return true; }
	}

	function hasDefaults(formType) {
		switch (formType)
		{
			case "contact" :
				if(evalDefault('#name') && evalDefault('#email') && evalDefault('#message')) { return true; }
				else { return false; }

			default :
				return false;
		}
	}

	function focusField(fieldID) {
		$(fieldID).focus(function(evaluation) {
			if(evalDefault(fieldID)) { $(fieldID).val(''); }
		}).blur(function(evaluation) {
			if(evalDefault(fieldID) || $(fieldID).val() === '') { $(fieldID).val($(fieldID).attr('data-default')); }
		});
	}

	$( '#yenoh-pic-refresh' ).click( function( event ){
		event.preventDefault();
		$( this ).find ('img').remove();
		$( this ).append( '<img src="assets/php/yenoh/yenoh.php" id="yenoh-pic" alt="Honey!">' );
		$( '#yenoh' ).val('');
		return false;
	});

	$('.button-submit').click(function(event) {
		event.preventDefault();
	});
	$('#submit-contact').bind('click', function(){
		if(!hasDefaults('contact')) { $('#form-contact').submit(); }
	});

	$("#form-contact").validate({
		rules: {
			name: {
				required: true,
				minlength: 3
			},
			email: {
				required: true,
				email: true
			},
			message: {
				required: true,
				minlength: 10
			},
			yenoh: {
				remote: {
					url: "assets/php/yenoh/yenoh-check.php",
					type: "POST"
				}
			}			
		},
		messages: {
			name: {
				required: "Please enter your name.",
				minlength: "Name must have at least 3 characters."
			},
			email: {
				required: "Please enter your email address.",
				email: "This is not a valid email address format."
			},
			message: {
				required: "Please enter a message.",
				minlength: "Message must have at least 10 characters."
			},
			yenoh: {
				required: "Please enter the code.",
				minlength: "Code must be 4 characters long.",
				maxlength: "Code must be 4 characters long.",
				remote: "Code is incorrent. Try again or click image to refresh."
			}
		}
	});

	function validateContact() {
		if(!$('#form-contact').valid()) { return false; }
		else { return true; }
	}

	$("#form-contact").ajaxForm({
		beforeSubmit: validateContact,
		type: "POST",
		url: "assets/php/contact-form-process.php",
		data: $( "#form-contact" ).serialize(),
		success: function( msg ){
			$( "#form-message" ).ajaxComplete( function( event, request, settings ){
				if( msg == 'OK' ) // Message Sent? Show the 'Thank You' message
				{
					result = '<span class="form-message-success"><i class="fa fa-thumbs-up"></i> Your message was sent. Thank you!</span>';
					clear = true;
				}
				else
				{
					result = '<span class="form-message-error"><i class="fa fa-thumbs-down"></i> ' + msg +'</span>';
					clear = false;
				}
				$( this ).html( result ).fadeIn( 'fast' ).delay( 5000 ).fadeOut( 'slow' );
				$( '#content .container' ).scrollTop( $( '#form-message' ).position().top );

				if( clear == true ) {
					$( '#name' ).val( nameDefault );
					$( '#email' ).val( emailDefault );
					$( '#message' ).val( messageDefault );
					$( '#yenoh-pic-refresh' ).find ('img').remove();
					$( '#yenoh-pic-refresh' ).append( '<img src="assets/php/yenoh/yenoh.php" id="yenoh-pic" alt="Honey!">' );
					$( '#yenoh' ).val('');
				}
			});
		}
	});
});
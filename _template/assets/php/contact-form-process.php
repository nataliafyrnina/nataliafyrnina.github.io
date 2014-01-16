<?php
session_start();

/*
Credits: Bit Repository
URL: http://www.bitrepository.com/
*/

/* Setup your email address to receive emails */
define( 'WEBMASTER_EMAIL', 'username@emailprovider.com' );
define( 'EMAIL_SUBJECT', 'New message received' );


/* Do not edit below this line */

function validate_email( $email ) {
	$regex = '/([a-z0-9_.-]+)'. # (Name) Letters, Numbers, Dots, Hyphens and Underscores

	'@'. # (@ -at- sign)

	'([a-z0-9.-]+){2,255}'. # Domain) (with possible subdomain(s) ).

	'.'. # (. -period- sign)

	'([a-z]+){2,10}/i'; # (Extension) Letters only (up to 10 (can be increased in the future) characters)

	if($email == '') { 
		return false;
	}
	else {
		$eregi = preg_replace( $regex, '', $email );
	}

	return empty( $eregi ) ? true : false;
}

error_reporting ( E_ALL ^ E_NOTICE );

$post = ( !empty( $_POST ) ) ? true : false;

if( $post )
{

	$name = stripslashes( strip_tags( $_POST['name'] ) );
	$email = trim( $_POST['email'] );
	$subject = EMAIL_SUBJECT;
	$message = stripslashes( strip_tags( $_POST['message'] ) );
	$captcha = strtoupper( trim( stripslashes( strip_tags( $_POST['yenoh'] ) ) ) );

	$error = '';

	// Check name

	if( !$name )
	{
		$error .= 'Please enter your name.<br />';
	}

	// Check email

	if( !$email )
	{
		$error .= 'Please enter an e-mail address.<br />';
	}

	if( $email && !validate_email( $email ) )
	{
		$error .= 'Please enter a valid e-mail address.<br />';
	}

	// Check agains bot habit

	if ( $name && $email && $name == $email ) {
		$error .= 'Name and email cannot be the same.<br />';
	}
	
	// Check subject

	if( !$subject )
	{
		$error .= 'Please enter a subject.<br />';
	}

	// Check message (length)

	if( !$message || strlen( $message ) < 10 )
	{
		$error .= "Please enter your message. It should have at least 10 characters.<br />";
	}

    // Check captcha
    if( $captcha != $_SESSION['secure']['captcha'] || strlen( $captcha ) != 4 )
    {
        $error .= "Your code is incorrect. Refresh and try again.<br />".$captcha."/".$_SESSION['secure']['captcha']."/". strlen( $captcha );
    }

    // Check timer
    if( isset( $_SESSION['secure']['time'] ) && time()-$_SESSION['nonce']['time'] < 30 ) {
        $error .= "Moving too fast!<br />";
    }

	if( !$error )
	{
		$mail = mail( WEBMASTER_EMAIL, $subject, $message,
		 "From: ". $name ." <".$email.">\r\n"
		."Reply-To: ".$email."\r\n"
		."X-Mailer: PHP/" . phpversion() );

		if( $mail ) { echo 'OK'; }

	}
	else { echo $error; }
}
?>
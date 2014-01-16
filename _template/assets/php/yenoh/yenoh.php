<?php
session_start();

// SECURITY WARNING: Please do not mess with the contents of this file, for your own good.

// Removing SESSION variables if already generated
if( isset( $_SESSION['secure']['captcha_a'] ) ) { unset($_SESSION['secure']['captcha_a'] ); }
if( isset( $_SESSION['secure']['captcha_b'] ) ) { unset($_SESSION['secure']['captcha_b'] ); }
if( isset( $_SESSION['secure']['captcha'] ) ) { unset($_SESSION['secure']['captcha'] ); }

// Generating new SESSION secure
$_SESSION['secure']['captcha_a'] = doNonce(2);
$_SESSION['secure']['captcha_b'] = doNonce(2);
$_SESSION['secure']['captcha'] = strtoupper( $_SESSION['secure']['captcha_a'] . $_SESSION['secure']['captcha_b'] );

// Nonce generator
function doNonce( $length ) {
    $string = '';
    $chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    for ( $i = 0; $i < $length; $i++ ) {
        $string .= substr( $chars, mt_rand( 0, strlen( $chars )-1 ), 1 );
    }
    return $string;
}

function doCaptchaImg() {
    $captcha_bg = dirname( __FILE__ ) . '/backgrounds/back-' . rand(1,4) . '.png';
    $captcha_font_a = dirname( __FILE__ ) . '/fonts/font-1.ttf';
    $captcha_font_b = dirname( __FILE__ ) . '/fonts/font-2.ttf';
    $captcha_string_a = $_SESSION['secure']['captcha_a'];
    $captcha_string_b = $_SESSION['secure']['captcha_b'];

    $captcha_png = imagecreatefrompng( $captcha_bg );

    $font_white = imagecolorallocate( $captcha_png, 255, 255, 255 );
    $font_grey = imagecolorallocate( $captcha_png, 128, 128, 128 );
    $font_black = imagecolorallocate( $captcha_png, 0, 0, 0 );
    $font_size_a = rand(15, 17);
    $font_size_b = rand(15, 17);
    $font_angle_a = rand(-10, 10);
    $font_angle_b = rand(-10, 10);
    $font_a_x = rand(5,12);
    $font_a_y = rand(20,30);
    $font_b_x = rand(37,41);
    $font_b_y = rand(20,30);

    imagettftext( $captcha_png, $font_size_a, $font_angle_a, $font_a_x, $font_a_y, $font_white, $captcha_font_a, $_SESSION['secure']['captcha_a'] );
    imagettftext( $captcha_png, $font_size_b, $font_angle_b, $font_b_x, $font_b_y, $font_white, $captcha_font_b, $_SESSION['secure']['captcha_b'] );

    imagealphablending( $captcha_png, false );
    imagesavealpha( $captcha_png, true );

    header( 'Content-Type: image/png' );

    imagepng( $captcha_png );
    imagedestroy( $captcha_png );
}

doCaptchaImg();
?>
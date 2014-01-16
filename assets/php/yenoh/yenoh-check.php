<?php
session_start();

$captcha = $_SESSION['secure']['captcha'];
$yenoh = strtoupper( trim( stripslashes( strip_tags( $_REQUEST['yenoh'] ) ) ) );

if ( $captcha === $yenoh ) {
	echo json_encode(TRUE);
}
else {
	echo json_encode(FALSE);
}
?>
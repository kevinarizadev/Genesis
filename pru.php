<?php
Session_Start();
$_SESSION['acc'] = 'asd';
$_SESSION['pass'] = '123';
$_SESSION['nomb'] = 'kev';

// print_r($_SESSION);
// $session = json_encode($_SESSION);
$session = ($_SESSION);

unset($session['acc']);
print_r($session);
echo '<br>';

print_r($_SESSION);
// echo $session;
//   $ses = json_encode($_SESSION);
//   if($ses != "[]"){
//       echo $ses;
//   } else {
//       echo true;
//   }
  ?>

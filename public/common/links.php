<?php
$files = scandir(getcwd());
foreach ($files as $file){
    if ($file == '.'){
        echo '<a href="../">Go Up</a>';
    }      
    else if ($file != '..' and $file != 'common'){
        echo '<a href="../'.$file.'/">'.$file.'</a>';
    }
}
?>

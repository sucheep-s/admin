<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$conn = new mysqli("127.0.0.1", "root", "Oam48552", "charm");

$sql = "DELETE FROM food  WHERE id = ".$_POST["id"]." ";

if ($conn->query($sql) === TRUE) {
    $outp = '{"success":"'  . "success" . '"}';
} else {
    $outp = '{"error":"'  . "error" . '"}';
}

$conn->close();

echo($outp);
?>

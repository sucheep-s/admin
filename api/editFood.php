<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$conn = new mysqli("127.0.0.1", "root", "Oam48552", "charm");

$sql = "UPDATE food SET name = '".$_POST["name"]."', description = '".$_POST["description"]."', price = ".$_POST["price"].", updated_date = '".date("Y-m-d G:i:s")."', isShown = ".$_POST["isShown"]." WHERE id = ".$_POST["id"]." ";

if ($conn->query($sql) === TRUE) {
    $outp = '{"success":"'  . "success" . '"}';
} else {
    $outp = '{"error":"'  . "error" . '"}';
}

$conn->close();

echo($outp);
?>

<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$conn = new mysqli("127.0.0.1", "root", "Oam48552", "charm");

$sql = "INSERT INTO category (name, updated_date, isShown) VALUES('".$_POST["cat"]."', '".date("Y-m-d G:i:s")."', 1)";


if ($conn->query($sql) === TRUE) {
    $last_id = $conn->insert_id;
    $outp = '{"id":"'  . $last_id  . '",';
    $outp .= '"name":"'   . $_POST["cat"]       . '",';
    $outp .= '"isShown":"'. "1"     . '"}';
} else {
    $outp = '{"error":"'  . "error" . '"}';
}

$conn->close();

echo($outp);
?>

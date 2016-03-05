<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$conn = new mysqli("127.0.0.1", "root", "Oam48552", "charm");

$sql = "INSERT INTO food (name, description, price, category_id, updated_date, isShown)";
$sql .= " VALUES('".$_POST["name"]."', '".$_POST["description"]."', ".$_POST["price"].", ".$_POST["catId"].", '".date("Y-m-d G:i:s")."', 1)";


if ($conn->query($sql) === TRUE) {
    $last_id = $conn->insert_id;
    $outp = '{"id":"'  . $last_id  . '",';
    $outp .= '"name":"'   . $_POST["name"] . '",';
    $outp .= '"description":"'   . $_POST["description"]  . '",';
    $outp .= '"price":"'   . $_POST["price"] . '",';
    $outp .= '"isShown":"'. "1"     . '"}';
} else {
    $outp = '{"error":"'  . "error" . '"}';
}

$conn->close();

echo($outp);
?>

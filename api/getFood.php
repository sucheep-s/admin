<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$conn = new mysqli("127.0.0.1", "root", "Oam48552", "charm");

$catId = $_GET["catId"];

$result = $conn->query("SELECT id, name, description, price, isShown FROM food where category_id = ".$catId);

$outp = "[";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "[") {$outp .= ",";}
    $outp .= '{"id":"'  . $rs["id"] . '",';
    $outp .= '"name":"'   . $rs["name"] . '",';
    $outp .= '"description":"'   . $rs["description"]  . '",';
    $outp .= '"price":"'   . $rs["price"] . '",';
    $outp .= '"isShown":"'. $rs["isShown"] . '"}';
}
$outp .="]";

$conn->close();

echo($outp);
?>

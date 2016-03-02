<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$conn = new mysqli("127.0.0.1", "root", "Oam48552", "charm");

$result = $conn->query("SELECT id, name, isShown FROM category");

$outp = "[";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "[") {$outp .= ",";}
    $outp .= '{"id":"'  . $rs["id"] . '",';
    $outp .= '"name":"'   . $rs["name"]        . '",';
    $outp .= '"isShown":"'. $rs["isShown"]     . '"}';
}
$outp .="]";

$conn->close();

echo($outp);
?>

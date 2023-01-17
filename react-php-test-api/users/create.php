<?php

include('../includes/shared.php');

$user = json_decode(file_get_contents('php://input'));

$sql = "INSERT INTO users (name, email, mobile) values(?, ?, ?)";

$stmt = $db->prepare($sql);

$stmt->bind_param('ssi', $user->name, $user->email, $user->contact);

if ($stmt->execute()) {
    $data = ['status' => 1, 'message' => "Record successfully created"];
} else {
    $data = ['status' => 0, 'message' => "Failed to create record."];
}
echo json_encode($data);

<?php

include '../includes/shared.php';

$user = json_decode(file_get_contents('php://input'));
$sql = "UPDATE users SET name= ?, email =?, mobile =? WHERE id = ?";
$stmt = $db->prepare($sql);

$stmt->bind_param('ssii', $user->name, $user->email, $user->mobile, $user->id);

if ($stmt->execute()) {
    $response = ['status' => 1, 'message' => 'Record updated successfully.'];
} else {
    $response = ['status' => 0, 'message' => 'Failed to update record.'];
}

echo json_encode($response);

<?php

include '../includes/shared.php';

$user = json_decode(file_get_contents('php://input'));
$sql = "DELETE FROM users WHERE id = ?";

$stmt = $db->prepare($sql);
$stmt->bind_param('i', $user->id);

if ($stmt->execute()) {
    $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
} else {
    $response = ['status' => 0, 'message' => 'Failed to delete record.'];
}

echo json_encode($response);

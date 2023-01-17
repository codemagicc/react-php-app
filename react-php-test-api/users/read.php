<?php

include '../includes/shared.php';

$sql = "SELECT * FROM users";
$path = explode('/', $_SERVER['REQUEST_URI']);
$user = $_GET['user'];

if (isset($user) && is_numeric($user)) {
    $sql .= " WHERE id = ?";
    $stmt = $db->prepare($sql);
    $stmt->bind_param('i', $user);
} else {
    $stmt = $db->prepare($sql);
}

if ($stmt->execute()) {
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        $users = $result->fetch_all(MYSQLI_ASSOC);
    }
}

echo json_encode($users);

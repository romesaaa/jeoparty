<?php
// db.php
$servername = "localhost";
$username = "ahmed5i_projectMatchingSystem";
$password = "yGJQXAr2D3bt5JqqExUw";
$dbname = "ahmed5i_projectMatchingSystem";

$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch categories and questions
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $categoriesResult = $conn->query("SELECT * FROM categories");
    $questionsResult = $conn->query("SELECT * FROM questions");

    $categories = $categoriesResult->fetch_all(MYSQLI_ASSOC);
    $questions = $questionsResult->fetch_all(MYSQLI_ASSOC);

    echo json_encode(["categories" => $categories, "questions" => $questions]);
}
?>

<?php

include 'db.inc.php';

function addUser($conn, $username, $password, $email) {

    $stmnt = $conn->prepare("INSERT INTO users (uid, pwd, em, admin) VALUES (?, ?, ?, ?)");
    $stmnt->bind_param("ssss", $st_uid, $st_pwd, $st_em, $st_admin);

    $st_uid = $username;
    $st_pwd = $password;
    $st_em = $email;
    $st_admin = 0;

    $stmnt->execute();
}

function check($conn, $check_what, $check_for) {

    $stmnt = $conn->prepare("SELECT * FROM users WHERE ".$check_what."=?");
    $stmnt->bind_param("s", $st_check);

    $st_check = $check_for;

    $stmnt->execute();
    $results = $stmnt->get_result();

    $numRows = $results->num_rows;

    if($numRows > 0) {

        return true;
    }
}

$uid = $_POST['uid'];
$pwd = $_POST['pwd'];
$em = $_POST['em'];

if (check($conn, "uid", $uid) === true)
    exit("uid_taken");

elseif (check($conn, "em", $em) === true)
    exit("em_taken");

else {

    if (strlen($pwd) < 6)
        exit("pwd_error");

    elseif (preg_match('/[\'^£$%&*()}{@#~?><>,|=_+¬-]/', $uid) == true)
        exit("uid_error_special");

    elseif(strlen($uid) < 5)
        exit("uid_error");

    elseif(preg_match('/[@.]/', $em) == false)
        exit("em_error");

    else {
        $hs_pwd = password_hash($pwd, PASSWORD_DEFAULT);

        addUser($conn, $uid, $hs_pwd, $em);
        echo("<p style='color: var(--turq);'>Signed up successfuly as: ".$uid." !</p>");
        exit();
    }
}


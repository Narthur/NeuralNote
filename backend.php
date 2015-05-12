<?php
$db = new PDO('sqlite:db.sq3');

if ($_POST['action'] == 'hello') {
    try {
        $db->exec("PRAGMA foreign_keys = ON;");
        $db->exec("CREATE TABLE note (noteId INTEGER PRIMARY KEY)");
        $db->exec("CREATE TABLE note_note (noteId1 INTEGER NOT NULL, noteId2 INTEGER NOT NULL, PRIMARY KEY (noteId1, noteId2), FOREIGN KEY(noteId1) REFERENCES note(noteId), FOREIGN KEY(noteId2) REFERENCES note(noteId))");
        $db->exec("CREATE TABLE version (versionId INTEGER PRIMARY KEY, noteId INTEGER NOT NULL, date DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL, content TEXT NOT NULL, FOREIGN KEY(noteId) REFERENCES note(noteId))");
    } catch(PDOException $e) {
        echo 'Exception: '.$e->getMessage();
    }
    echo "Connection established.";
}

if ($_POST['action'] == 'new') {
    try {
        $note = $_POST['content'];
        $db->exec("INSERT INTO note DEFAULT VALUES");
        $noteId = $db->lastInsertId();
        $db->exec("INSERT INTO version (noteId, content) VALUES($noteId, '$note')");
    } catch (PDOException $e) {
        echo 'Exception: '.$e->getMessage();
    }
    echo "Note saved.";
}

if ($_POST['action'] == 'load') {
    try {
        if (isset($_POST['linkedTo'])) {
            $linkedTo = $_POST['linkedTo'];
            $statement = $db->prepare("SELECT noteId, content, max(date) FROM version AS v JOIN note_note AS c WHERE (c.noteId1=v.noteId AND c.noteId2=$linkedTo) OR (c.noteId2=v.noteId AND c.noteId1=$linkedTo) GROUP BY v.noteId");
        } else {
            $statement = $db->prepare("SELECT noteId, content, max(date) FROM version GROUP BY noteId");
        }
        $statement->execute();
        $notes = $statement->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($notes);
    } catch (PDOException $e) {
        echo 'Exception: '.$e->getMessage();
    }
}
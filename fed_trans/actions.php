<?php

function send_mail($from, $to, $subj, $text) {
    $un = strtoupper(uniqid(time())); 
    $head = "From: $from\n";
    $head .= "Subject: $subj\n"; 
    $head .= "X-Mailer: PHPMail Tool\n"; 
    $head .= "Reply-To: $from\n"; 
    $head .= "Mime-Version: 1.0\n"; 
    $head .= "Content-Type: text/html; charset=utf-8\n"; 
    return @mail($to, $subj, $text, $head);
}

$from = 'noreplay@ftotrans.ru'; // от кого
$to = 'vetal-dovzhenko@yandex.ru'; // куда

if(isset($_GET['do'])) {
    $do = $_GET['do'];

    if($do === 'order') {
        $name = $_POST['name'];
        $telephone = $_POST['telephone'];

        $subj = 'Заявка';
        $text = '';
        $text .= '<p><strong>Имя:</strong> '.$name.'</p>';
        $text .= '<p><strong>Телефон:</strong> '.$telephone.'</p>';

        send_mail($from, $to, $subj, $text);
        return;
    }

    if($do === 'price') {
        $name = $_POST['name'];
        $telephone = $_POST['telephone'];
        $email = $_POST['email'];

        $subj = 'Получение прайса';
        $text = '';
        $text .= '<p><strong>Имя:</strong> '.$name.'</p>';
        $text .= '<p><strong>Телефон:</strong> '.$telephone.'</p>';
        $text .= '<p><strong>E-Mail:</strong> '.$email.'</p>';

        send_mail($from, $to, $subj, $text);
        return;
    }

    if($do === 'consultation') {
        $telephone = $_POST['telephone'];

        $subj = 'Консультация';
        $text = '<p><strong>Телефон:</strong> '.$telephone.'</p>';

        send_mail($from, $to, $subj, $text);
        return;
    }
}
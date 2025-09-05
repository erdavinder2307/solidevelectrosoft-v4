<?php
// Enable error reporting for debugging (remove in production)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set content type to JSON
header('Content-Type: application/json');

// Allow CORS for local development
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Only process POST requests.
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Get the form fields and remove whitespace.
    $name = strip_tags(trim($_POST["name"]));
    $name = str_replace(array("\r","\n"),array(" "," "),$name);
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $phone = isset($_POST["phone"]) ? strip_tags(trim($_POST["phone"])) : '';
    $subject = isset($_POST["subject"]) ? trim($_POST["subject"]) : 'New Contact Form Submission';
    $message = trim($_POST["message"]);
    $form_type = isset($_POST["form_type"]) ? $_POST["form_type"] : 'contact';

    // Check that data was sent to the mailer.
    if (empty($name) OR empty($message) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Please complete all required fields and provide a valid email address.'
        ]);
        exit;
    }

    // Set the recipient email address.
    $recipient = "admin@solidevelectrosoft.com";
    $cc_recipient = "davinder@solidevelectrosoft.com";

    // Set the email subject based on form type
    if ($form_type === 'floating_query') {
        $email_subject = "New Query from Website - $name";
    } else {
        $email_subject = "New Contact Form Submission - $name";
    }

    // Email Header
    $header = "=== SOLIDEV ELECTROSOFT - NEW INQUIRY ===";

    // Build the email content.
    $email_content = "$header\n\n";
    $email_content .= "Form Type: " . ucfirst(str_replace('_', ' ', $form_type)) . "\n";
    $email_content .= "Submission Date: " . date('Y-m-d H:i:s') . "\n\n";
    $email_content .= "CONTACT DETAILS:\n";
    $email_content .= "==================\n";
    $email_content .= "Name: $name\n";
    $email_content .= "Email: $email\n";
    
    if (!empty($phone)) {
        $email_content .= "Phone: $phone\n";
    }
    
    if (!empty($subject) && $subject !== 'New Contact Form Submission') {
        $email_content .= "Subject: $subject\n";
    }
    
    $email_content .= "\nMESSAGE:\n";
    $email_content .= "=========\n";
    $email_content .= "$message\n\n";
    $email_content .= "---\n";
    $email_content .= "This email was sent from the Solidev Electrosoft website contact form.\n";
    $email_content .= "Website: https://solidevelectrosoft.com\n";
    $email_content .= "IP Address: " . $_SERVER['REMOTE_ADDR'] . "\n";

    // Build the email headers.
    $email_headers = "From: Solidev Website <noreply@solidevelectrosoft.com>\r\n";
    $email_headers .= "Reply-To: $name <$email>\r\n";
    $email_headers .= "CC: $cc_recipient\r\n";
    $email_headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
    $email_headers .= "MIME-Version: 1.0\r\n";
    $email_headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Attempt to send the email.
    $mail_sent = mail($recipient, $email_subject, $email_content, $email_headers);
    
    if ($mail_sent) {
        // Set a 200 (okay) response code.
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'message' => 'Thank you for your message! We will get back to you within 24 hours.'
        ]);
        
        // Log successful submission (optional)
        error_log("Email sent successfully to $recipient from $email");
        
    } else {
        // Set a 500 (internal server error) response code.
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Sorry, there was an error sending your message. Please try again or contact us directly at admin@solidevelectrosoft.com'
        ]);
        
        // Log the error
        error_log("Failed to send email from $email to $recipient");
    }

} else {
    // Not a POST request, set a 405 (method not allowed) response code.
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Invalid request method. Only POST requests are allowed.'
    ]);
}
?>


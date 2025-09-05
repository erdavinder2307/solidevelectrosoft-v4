$(function() {

	// Contact Form Handler
	var contactForm = $('form[name="form"]');
	var contactFormMessages = $('.ajax-response');

	// Floating Menu Query Form Handler  
	var queryForm = $('#queryForm');

	// Set up event listener for the main contact form
	$(contactForm).submit(function(e) {
		e.preventDefault();

		// Show loading state
		var submitBtn = $(this).find('button[type="submit"]');
		var originalText = submitBtn.html();
		submitBtn.html('Sending...').prop('disabled', true);

		// Add form type identifier
		var formData = $(contactForm).serialize() + '&form_type=contact';

		// Submit the form using AJAX to our PHP handler
		$.ajax({
			type: 'POST',
			url: 'assets/mail.php',
			data: formData,
			dataType: 'json',
			timeout: 10000
		})
		.done(function(response) {
			if (response.success) {
				// Success message
				if (contactFormMessages.length) {
					$(contactFormMessages).removeClass('error').addClass('success');
					$(contactFormMessages).text(response.message);
				} else {
					alert(response.message);
				}
				
				// Clear the form
				contactForm[0].reset();
			} else {
				// Error from server
				if (contactFormMessages.length) {
					$(contactFormMessages).removeClass('success').addClass('error');
					$(contactFormMessages).text(response.message);
				} else {
					alert('Error: ' + response.message);
				}
			}
		})
		.fail(function(xhr, status, error) {
			var errorMessage = 'Sorry, there was an error sending your message. Please try again.';
			
			if (xhr.responseJSON && xhr.responseJSON.message) {
				errorMessage = xhr.responseJSON.message;
			} else if (status === 'timeout') {
				errorMessage = 'Request timed out. Please check your connection and try again.';
			}

			if (contactFormMessages.length) {
				$(contactFormMessages).removeClass('success').addClass('error');
				$(contactFormMessages).text(errorMessage);
			} else {
				alert(errorMessage);
			}
		})
		.always(function() {
			// Restore button state
			submitBtn.html(originalText).prop('disabled', false);
		});
	});

	// Set up event listener for the floating menu query form
	$(queryForm).submit(function(e) {
		e.preventDefault();

		// Show loading state
		var submitBtn = $(this).find('button[type="submit"]');
		var originalText = submitBtn.html();
		submitBtn.html('Sending...').prop('disabled', true);

		// Add form type identifier
		var formData = $(queryForm).serialize() + '&form_type=floating_query';

		// Submit the form using AJAX to our PHP handler
		$.ajax({
			type: 'POST',
			url: 'assets/mail.php',
			data: formData,
			dataType: 'json',
			timeout: 10000
		})
		.done(function(response) {
			if (response.success) {
				// Success message
				alert(response.message);
				
				// Clear the form and close modal
				queryForm[0].reset();
				$('#queryModal').removeClass('active');
				
				// Close floating menu
				$('#floatingMenuItems').removeClass('active');
				$('#floatingMenuToggle').removeClass('active');
			} else {
				// Error from server
				alert('Error: ' + response.message);
			}
		})
		.fail(function(xhr, status, error) {
			var errorMessage = 'Sorry, there was an error sending your message. Please try again.';
			
			if (xhr.responseJSON && xhr.responseJSON.message) {
				errorMessage = xhr.responseJSON.message;
			} else if (status === 'timeout') {
				errorMessage = 'Request timed out. Please check your connection and try again.';
			}

			alert(errorMessage);
		})
		.always(function() {
			// Restore button state
			submitBtn.html(originalText).prop('disabled', false);
		});
	});

	// Handle legacy contact form with ID (if exists)
	var legacyContactForm = $('#contact-form');
	if (legacyContactForm.length) {
		$(legacyContactForm).submit(function(e) {
			e.preventDefault();

			var submitBtn = $(this).find('button[type="submit"]');
			var originalText = submitBtn.html();
			submitBtn.html('Sending...').prop('disabled', true);

			var formData = $(legacyContactForm).serialize() + '&form_type=contact';

			$.ajax({
				type: 'POST',
				url: 'assets/mail.php',
				data: formData,
				dataType: 'json',
				timeout: 10000
			})
			.done(function(response) {
				if (response.success) {
					$(contactFormMessages).removeClass('error').addClass('success');
					$(contactFormMessages).text(response.message);
					legacyContactForm[0].reset();
				} else {
					$(contactFormMessages).removeClass('success').addClass('error');
					$(contactFormMessages).text(response.message);
				}
			})
			.fail(function(xhr, status, error) {
				var errorMessage = 'Sorry, there was an error sending your message.';
				if (xhr.responseJSON && xhr.responseJSON.message) {
					errorMessage = xhr.responseJSON.message;
				}
				$(contactFormMessages).removeClass('success').addClass('error');
				$(contactFormMessages).text(errorMessage);
			})
			.always(function() {
				submitBtn.html(originalText).prop('disabled', false);
			});
		});
	}

});

$(document).ready(function() {
	$.getJSON('/api/entries', function(entries) {
		entries.forEach(function(entry) {
			showEntry(entry);
		});
	});

	$('#company-input').keypress(function(event) {
		if (event.which == 13) {
			$(this).next('input').focus();
		}
	});

	$('#position-input').keypress(function(event) {
		if (event.which == 13) {
			createEntry();
		}
	});

	// honestly, 'list' should be an id, so jQuery can get it easier.
	$('.list').on('click', '.dropdown', function(event) {
		$(this).next('.selection').toggle();
	});



	$('.list').on('click', '.select', function(event) {
		event.stopPropagation();
		updateEntry($(this).parent().parent().parent(), $(this));
	});

	$('.list').on('click', '.select.delete', function(event) {
		removeEntry($(this).parent().parent().parent());
	});

});

function showEntry(entry) {
	var entryDisplay = $(
		'<div class="item">'
		+ '<div class="info column">'
			+ '<div class="header detail">' + entry.company + '</div>'
			+ '<div class="position detail">' + entry.position + '</div>'
		+ '</div>'
		+ '<div class="options column">'
			+ '<div class="dropdown">'
				+ '<i class="fa fa-angle-down"></i>'
				+ 'change status'
			+ '</div>'
			+ '<div class="selection">'
				+ '<a class="select" id="in_progress">in_progress</a>'
				+ '<a class="select" id="awaiting_response">awaiting_response</a>'
				+ '<a class="select" id="rejected">rejected</a>'
				+ '<a class="select" id="accepted">accepted</a>'
				+ '<a class="select delete">delete</a>'
			+ '</div>'
		+ '</div>'
		+ '<div class="status column">'
		+ '</div>'
	+ '</div>'
	);
	
	
	entryDisplay.data('id', entry._id);
	entryDisplay.data('status', entry.status);
	changeColor(entryDisplay, entry.status);
	$('.list').append(entryDisplay);
}

function createEntry() {
	var companyName = $('#company-input').val();
	var positionName = $('#position-input').val();
	$.post('/api/entries', {
		company: companyName,
		position: positionName,
	}).then(function(newEntry) {
		$('#company-input').val('');
		$('#position-input').val('');
		showEntry(newEntry);
		$('#company-input').focus();
	}).catch(function(error) {
		console.log(error);
	});
}

function removeEntry(entry) {
	$.ajax({
		method: 'DELETE',
		url: '/api/entries/' + entry.data('id'),
	}).then(function(data) {
		entry.remove();
	}).catch(function(error) {
		console.log(error);
	});
}

function updateEntry(entry, clickedLink) {
	var newStatus = clickedLink.attr('id');
	var oldStatus = entry.data('status');
	$.ajax({
		method: 'PUT',
		url: '/api/entries/' + entry.data('id'),
		data: {status: newStatus},
	}).then(function(updatedEntry) {
		entry.data('status', newStatus);
		changeColor(entry, newStatus);
	}).catch(function(error) {
		console.log(error);
	});
}

function changeColor(entry, newStatus) {
	var newColor;
 	if (newStatus == 'in_progress') {
 		newColor = 'lightgrey';
 	} else if (newStatus == 'awaiting_response') {
 		newColor = 'orange';
 	} else if (newStatus == 'rejected') {
 		newColor = 'red';
 	} else if (newStatus == 'accepted') {
 		newColor = 'green';
 	}
 	entry.find('.status').css('background', newColor);
 	entry.find('.selection').toggle();
 }



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

	$('.table').on('click', '.delete', function(event) {
		removeEntry($(this).parent());
	});

	$('.table').on('click', '.status', function(event) {
		updateEntry($(this).parent(), $(this).text());
	});

});

function showEntry(entry) {
	var entryDisplay = $('<div class="row">' 
			                 + '<div class="company cell">' + entry.company + '</div>'
											 + '<div class="position cell">' + entry.position + '</div>'
											 + '<div class="status in_progress cell">in_progress</div>'
											 + '<div class="status awaiting_response" cell">awaiting_response</div>'
											 + '<div class="status rejected cell">rejected</div>'
											 + '<div class="status accepted cell">accepted</div>'
											 + '<div class="color cell"><p>           </p></div>'
											 + '<span class="delete">delete</span>'
											 + '</div>');
	entryDisplay.data('id', entry._id);
	entryDisplay.data('status', entry.status);
	entryDisplay.find('.color').addClass(entry.status);
	$('.table').append(entryDisplay);
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

function updateEntry(entry, statusUpdate) {
	var oldStatus = entry.data('status');
	$.ajax({
		method: 'PUT',
		url: '/api/entries/' + entry.data('id'),
		data: {status: statusUpdate},
	}).then(function(updatedEntry) {
		entry.data('status', statusUpdate);
		entry.find('.color').removeClass(oldStatus).addClass(statusUpdate);
	}).catch(function(error) {
		console.log(error);
	});
}



var $entryForm = document.querySelector('form');
var $photoURL = document.querySelector('#photo-url');
var $placeholder = document.querySelector('.placeholder');
var $entryList = document.querySelector('#entry-list');
var $views = document.querySelectorAll('div[data-view]');
var $newEntry = document.querySelector('.new-entry');
var $editEntry = document.querySelector('.edit-entry');
var $titleInput = document.querySelector('#title');
var $photoInput = document.querySelector('#photo-url');
var $notesInput = document.querySelector('#notes');
var $entryButton = document.querySelector('.view-entries');
var $newButton = document.querySelector('.new');
var $deleteButton = document.querySelector('button.delete');
var $cancelButton = document.querySelector('.cancel-button');
var $confirmButton = document.querySelector('.confirm-button');
var $overlay = document.querySelector('.overlay');
var $modal = document.querySelector('.modal');

$photoURL.addEventListener('change', function (event) {
  if ($photoURL.value === '') {
    $placeholder.src = 'images/placeholder-image-square.jpg';
    return $placeholder;
  }
  $placeholder.src = $entryForm.elements.photo.value;
});

$entryList.addEventListener('click', function (event) {
  event.preventDefault();
  if (event.target.tagName !== 'I') {
    return;
  }

  var closest = event.target.closest('ul > li');
  var closestEntryId = parseInt(closest.getAttribute('data-entry-id'), 10);

  for (var i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryId === closestEntryId) {
      data.editing = data.entries[i];
      break;
    }
  }
  $titleInput.value = data.editing.title;
  $entryForm.elements.title.value = data.editing.title;
  $entryForm.elements.photo.value = data.editing.photo;
  $entryForm.elements.notes.value = data.editing.value;
  $placeholder.src = data.editing.photo;

  if (data.editing !== null) {

    data.editFormValues = data.editing;

    $titleInput.value = data.editFormValues.title;
    $photoInput.value = data.editFormValues.photo;
    $notesInput.value = data.editFormValues.notes;
    $placeholder.src = data.editFormValues.photo;

    $newEntry.className = 'hidden';
    $editEntry.className = 'entry-title view';
    $deleteButton.className = 'delete view';
    handleView('entry-form');
    data.editFormValues = null;
  }
});

$entryForm.addEventListener('submit', function (event) {
  event.preventDefault();
  var entry = {
    title: $entryForm.elements.title.value,
    photo: $entryForm.elements.photo.value,
    notes: $entryForm.elements.notes.value,
    entryId: data.nextEntryId
  };

  var $entries = document.querySelectorAll('li');
  if (data.editing !== null) {
    for (var i = 0; i < $entries.length; i++) {

      var entryId = parseInt($entries[i].getAttribute('data-entry-id'), 10);

      if (entryId === data.editing.entryId) {

        data.editing.title = entry.title;
        data.editing.photo = entry.photo;
        data.editing.notes = entry.notes;

        $entries[i].replaceWith(renderEntry(data.editing));
        $placeholder.src = 'images/placeholder-image-square.jpg';

        data.editing = null;
        $entryForm.reset();
        handleView('entries');
        $newEntry.className = 'entry-title view';
        $editEntry.className = 'hidden';
      }
    }
  } else if (data.editing === null) {

    data.entries.unshift(entry);

    $entryList.prepend(renderEntry(entry));
    $placeholder.src = 'images/placeholder-image-square.jpg';
    $entryForm.reset();
    data.nextEntryId++;
    handleView('entries');
  }
});

$deleteButton.addEventListener('click', function (event) {
  $overlay.className = 'overlay on';
  $modal.className = 'modal view';
});

$newButton.addEventListener('click', function (event) {
  $editEntry.className = 'hidden';
  $newEntry.className = 'entry-title view';
  $placeholder.src = 'images/placeholder-image-square.jpg';
  $deleteButton.className = 'hidden';
  $entryForm.reset();
  handleView('entry-form');
});

$entryButton.addEventListener('click', function (event) {
  handleView('entries');
});

$cancelButton.addEventListener('click', function (event) {

  $overlay.className = 'overlay';
  $modal.className = 'modal hidden';
});

$confirmButton.addEventListener('click', function (event) {

  var $entries = document.querySelectorAll('li');
  for (var i = 0; i < $entries.length; i++) {
    var entryId = parseInt($entries[i].getAttribute('data-entry-id'), 10);
    if (data.editing.entryId === entryId) {

      var entry = $entries[i];
      data.entries.splice(entryId - data.entries.length, 1);
      data.editing = null;
      if (data.nextEntryId > 0) {
        data.nextEntryId--;
      }
      entry.remove();
      break;
    }
  }

  $overlay.className = 'overlay hidden';
  $modal.className = 'modal hidden';
  handleView('entries');
});

window.addEventListener('DOMContentLoaded', function (event) {
  for (var entryIndex = 0; entryIndex < data.entries.length; entryIndex++) {
    var $entry = renderEntry(data.entries[entryIndex]);
    $entryList.appendChild($entry);
    handleView(data.view);
  }

  if (data.view === 'entry-form' && data.editing !== null) {
    $titleInput.value = data.editing.title;
    $photoInput.value = data.editing.photo;
    $notesInput.value = data.editing.notes;
    $placeholder.src = data.editing.photo;

    data.editing = null;
    $deleteButton.className = 'delete view';
    $editEntry.className = 'entry-title view';
    $newEntry.className = 'hidden';
    handleView('entry-form');
  }

  if (data.view === 'entry-form' && data.editing === null) {
    $newEntry.className = 'entry-title view';
    $editEntry.className = 'hidden';
    handleView('entry-form');
  }

});

function renderEntry(entry) {

  var $entry = document.createElement('li');
  $entry.setAttribute('data-entry-id', entry.entryId);

  var $row = document.createElement('div');
  $row.setAttribute('class', 'row');

  var $columnHalf = document.createElement('div');
  $columnHalf.setAttribute('class', 'column-half column-top');

  var $img = document.createElement('img');
  $img.setAttribute('src', entry.photo);
  $img.setAttribute('class', 'photo-url');

  var $secondColumnHalf = document.createElement('div');
  $secondColumnHalf.setAttribute('class', 'column-half column-top');

  var $secondRow = document.createElement('div');
  $secondRow.setAttribute('class', 'row');

  var $thirdColumnHalf = document.createElement('div');
  $thirdColumnHalf.setAttribute('class', 'column-two-thirds column-edit');
  var $title = document.createElement('p');
  $title.setAttribute('class', 'title');
  $title.textContent = entry.title;

  var $fourthColumnHalf = document.createElement('div');
  $fourthColumnHalf.setAttribute('class', 'column-one-third column-edit edit');

  var $editSpan = document.createElement('span');
  $editSpan.setAttribute('class', 'edit-style');

  var $edit = document.createElement('i');
  $edit.setAttribute('class', 'fa-solid fa-pen edit-pen fa-xl');

  var $notes = document.createElement('p');
  $notes.setAttribute('class', 'notes');
  $notes.textContent = entry.notes;

  $entry.append($row);
  $row.append($columnHalf);
  $columnHalf.append($img);
  $row.append($secondColumnHalf);
  $secondColumnHalf.append($secondRow);
  $secondRow.append($thirdColumnHalf);
  $thirdColumnHalf.append($title);
  $secondRow.append($fourthColumnHalf);
  $fourthColumnHalf.append($editSpan);
  $editSpan.append($edit);
  $secondColumnHalf.append($notes);

  return $entry;
}

function handleView(viewData) {
  data.view = viewData;
  for (var i = 0; i < $views.length; i++) {
    if ($views[i].getAttribute('data-view') === viewData) {
      $views[i].className = 'view';
    } else {
      $views[i].className = 'hidden';
    }
  }
}

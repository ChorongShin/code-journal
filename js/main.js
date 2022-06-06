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

$photoURL.addEventListener('change', function (event) {
  if ($photoURL.value === '') {
    $placeholder.src = 'images/placeholder-image-square.jpg';
    return $placeholder;
  }
  $placeholder.src = $entryForm.elements.photo.value;
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
      // console.log(data.editing);

      $titleInput.value = data.editing.title;
      // console.log($titleInput);
      // console.log($titleInput.value);
      $photoInput.value = data.editing.photo;
      // console.log($photoInput.value);
      $notesInput.value = data.editing.notes;
      $placeholder.src = data.editing.photo;

      var entry = {
        title: data.editing.title,
        photo: data.editing.photo,
        notes: data.editing.notes,
        entryId: data.editing.entryId
      };

      data.editFormValues = entry;

      if (data.editFormValues !== null) {
        $titleInput.value = data.editFormValues.title;
        $photoInput.value = data.editFormValues.photo;
        $notesInput.value = data.editFormValues.notes;
        $placeholder.src = data.editFormValues.photo;
        data.editFormValues = null;
        handleView('entry-form');
        $newEntry.className = 'hidden';
        $editEntry.className = 'entry-title view';

      }
    }
  }
});

$newButton.addEventListener('click', function (event) {
  handleView('entry-form');
});

$entryButton.addEventListener('click', function (event) {
  handleView('entries');
});

window.addEventListener('DOMContentLoaded', function (event) {
  // var $exit = document.querySelector('.no-entries');

  if (data.view === 'entry-form' && data.editing !== null) {
    $titleInput.value = data.editing.title;
    $photoInput.value = data.editing.photo;
    $notesInput.value = data.editing.notes;
    $placeholder.src = data.editing.photo;

    $editEntry.className = 'entry-title view';
    $newEntry.className = 'hidden';
    handleView('entry-form');
  }

  if (data.view === 'entry-form' && data.editing === null) {
    $newEntry.className = 'entry-title view';
    $editEntry.className = 'hidden';
    handleView('entry-form');
  }

  if (data.view === 'entries') {
    for (var entryIndex = 0; entryIndex < data.entries.length; entryIndex++) {
      var $entry = renderEntry(data.entries[entryIndex]);
      $entryList.appendChild($entry);
      // $exit.remove();
      handleView('entries');
    }
  }

  // handleView(data.view);

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
      // console.log($views[i].getAttribute('data-view') === viewData);
      viewData = $views[i].getAttribute('data-view');
      // console.log(viewData);
      $views[i].className = 'view';
      // console.log($views[i]);
    } else {
      $views[i].className = 'hidden';
    }
  }
}

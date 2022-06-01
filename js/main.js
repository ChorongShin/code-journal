var $Entryform = document.querySelector('.entry-form');
var $photoURL = document.querySelector('#photo-url');
var $placeholder = document.querySelector('.placeholder');
var $entryList = document.querySelector('#entry-list');
var $views = document.querySelectorAll('div[data-view]');
var $editForm = document.querySelector('.edit-form');

$photoURL.addEventListener('change', function (event) {
  if ($photoURL.value === '') {
    $placeholder.src = 'images/placeholder-image-square.jpg';
    return $placeholder;
  }
  $placeholder.src = $Entryform.elements.photo.value;
});

var $render = document.querySelector('.exit');

$Entryform.addEventListener('submit', function (event) {
  event.preventDefault();

  var entry = {
    title: $Entryform.elements.title.value,
    photo: $Entryform.elements.photo.value,
    notes: $Entryform.elements.notes.value,
    entryId: data.nextEntryId
  };

  data.nextEntryId++;

  data.entries.unshift(entry);

  $entryList.prepend(renderEntry(entry));

  $placeholder.src = 'images/placeholder-image-square.jpg';
  $Entryform.reset();

  handleView('entries');
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

  var $secondColumnHalf = document.createElement('div');
  $secondColumnHalf.setAttribute('class', 'column-half column-top');

  var $secondRow = document.createElement('div');
  $secondRow.setAttribute('class', 'row');

  var $thirdColumnHalf = document.createElement('div');
  $thirdColumnHalf.setAttribute('class', 'column-half column-edit');
  var $title = document.createElement('p');
  $title.setAttribute('class', 'title');
  $title.textContent = entry.title;

  var $fourthColumnHalf = document.createElement('div');
  $fourthColumnHalf.setAttribute('class', 'column-half column-edit edit');

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

var $newButton = document.querySelector('.new');
$newButton.addEventListener('click', function (event) {
  handleView('entry-form');
});

var $entryButton = document.querySelector('.entry-header');
$entryButton.addEventListener('click', function (event) {
  handleView('entries');
});

document.addEventListener('DOMContentLoaded', function (event) {
  for (var entryIndex = 0; entryIndex < data.entries.length; entryIndex++) {
    var $entry = renderEntry(data.entries[entryIndex]);
    $entryList.appendChild($entry);
  }

  $render.remove();
  handleView(data.view);

});

function handleView(viewData) {
  data.view = viewData;
  for (var i = 0; i < $views.length; i++) {

    if ($views[i].getAttribute('data-view') === viewData) {
      viewData = $views[i].getAttribute('data-view');
      $views[i].className = 'view';

    } else {
      $views[i].className = 'hidden';
    }

  }

}

$entryList.addEventListener('click', function (event) {
  event.preventDefault();
  editEntry(data.editing);

});

function editEntry(editingData) {
  data.editing = editingData;
  for (var i = 0; i < data.entries.length; i++) {
    if (event.target.tagName === 'I') {
      handleView('edit-entry');
      var $entry = renderEditEntry(data.entries[i]);
      $editForm.appendChild($entry);
    }
  }

}

function renderEditEntry(entry) {
  var $container = document.createElement('div');
  $container.setAttribute('class', 'container');

  var $row = document.createElement('div');
  $row.setAttribute('class', 'row');

  var $columnHalf = document.createElement('div');
  $columnHalf.setAttribute('class', 'column-half');

  var $entryImgDiv = document.createElement('div');
  $entryImgDiv.setAttribute('class', 'entry-img');

  var $img = document.createElement('img');
  $img.setAttribute('src', entry.photo);
  $img.setAttribute('class', 'placeholder');

  var $secondColumnHalf = document.createElement('div');
  $secondColumnHalf.setAttribute('class', 'column-half');

  var $titleLabel = document.createElement('label');
  $titleLabel.setAttribute('for', 'title');
  $titleLabel.textContent = 'Title';

  var $titleInput = document.createElement('input');
  $titleInput.setAttribute('type', 'text');
  $titleInput.setAttribute('name', 'title');
  $titleInput.setAttribute('id', 'title');
  $titleInput.setAttribute('class', 'form-title');
  $titleInput.setAttribute('value', entry.title);
  $titleInput.required = true;

  var $photoLabel = document.createElement('label');
  $photoLabel.setAttribute('for', 'photo-url');
  $photoLabel.setAttribute('class', 'label-margin');
  $photoLabel.textContent = 'Photo URL';

  var $photoInput = document.createElement('input');
  $photoInput.setAttribute('type', 'url');
  $photoInput.setAttribute('name', 'photo');
  $photoInput.setAttribute('id', 'photo-url');
  $photoInput.setAttribute('value', entry.photo);
  $photoInput.required = true;

  var $secondRow = document.createElement('div');
  $secondRow.setAttribute('class', 'row');
  $secondRow.setAttribute('class', 'label-margin');

  var $columnFull = document.createElement('div');
  $columnFull.setAttribute('class', 'column-full');

  var $notesLabel = document.createElement('label');
  $notesLabel.setAttribute('for', 'notes');
  $notesLabel.textContent = 'Notes';

  var $notesInput = document.createElement('textarea');
  $notesInput.setAttribute('name', 'notes');
  $notesInput.setAttribute('id', 'notes');
  $notesInput.textContent = entry.notes;
  $notesInput.required = true;

  var $thirdRow = document.createElement('div');
  $thirdRow.setAttribute('class', 'row');

  var $thirdColumnHalf = document.createElement('div');
  $thirdColumnHalf.setAttribute('class', 'column-half');

  var $fourthColumnHalf = document.createElement('div');
  $fourthColumnHalf.setAttribute('class', 'column-half');

  var $saveButtonDiv = document.createElement('div');
  $saveButtonDiv.setAttribute('class', 'save-button-div');

  var $saveButton = document.createElement('button');
  $saveButton.setAttribute('type', 'submit');
  $saveButton.setAttribute('class', 'save-button');
  $saveButton.textContent = 'SAVE';

  $container.append($row);
  $row.append($columnHalf);
  $columnHalf.append($entryImgDiv);
  $entryImgDiv.append($img);
  $row.append($secondColumnHalf);
  $secondColumnHalf.append($titleLabel);
  $secondColumnHalf.append($titleInput);
  $secondColumnHalf.append($photoLabel);
  $secondColumnHalf.append($photoInput);

  $container.append($secondRow);
  $secondRow.append($columnFull);
  $columnFull.append($notesLabel);
  $columnFull.append($notesInput);

  $container.append($thirdRow);
  $thirdRow.append($thirdColumnHalf);
  $thirdRow.append($fourthColumnHalf);
  $fourthColumnHalf.append($saveButtonDiv);
  $saveButtonDiv.append($saveButton);

  return $container;
}

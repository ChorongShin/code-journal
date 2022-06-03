var $entryForm = document.querySelector('.entry-form');
var $photoURL = document.querySelector('#photo-url');
var $placeholder = document.querySelector('.placeholder');
var $entryList = document.querySelector('#entry-list');
var $views = document.querySelectorAll('div[data-view]');

var $newEntry = document.querySelector('.new-entry');
var $editEntry = document.querySelector('.edit-entry');

$photoURL.addEventListener('change', function (event) {
  if ($photoURL.value === '') {
    $placeholder.src = 'images/placeholder-image-square.jpg';
    return $placeholder;
  }
  $placeholder.src = $entryForm.elements.photo.value;
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

var $newButton = document.querySelector('.new');
$newButton.addEventListener('click', function (event) {
  handleView('entry-form');
});

var $entryButton = document.querySelector('.entry-header');
$entryButton.addEventListener('click', function (event) {
  handleView('entries');
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
      // console.log('entries', $entries[i]);
      var entryId = parseInt($entries[i].getAttribute('data-entry-id'), 10);
      if (entryId === data.editing.entryId) {
        // console.log(data.editing.entryId);
        // console.log('data entryId', data.editing.entryId);
        // console.log(entryId === data.editing.entryId);

        data.editing.title = entry.title;
        data.editing.photo = entry.photo;
        data.editing.notes = entry.notes;
        // console.log('data.editing all', data.editing);

        // console.log($entries[i]);

        $entries[i].replaceWith(renderEntry(data.editing));
        // console.log($entries[i].replaceWith(renderEntry(data.editing)));
        $placeholder.src = 'images/placeholder-image-square.jpg';
        $entryForm.reset();
        data.editing = null;
        handleView('entries');
        $newEntry.className = 'entry-title view';
        $editEntry.className = 'hidden';
      }
    }
  }

  if (data.editing === null) {

    data.entries.unshift(entry);

    $entryList.prepend(renderEntry(entry));
    $placeholder.src = 'images/placeholder-image-square.jpg';
    $entryForm.reset();
    data.nextEntryId++;
    handleView('entries');
  }

});

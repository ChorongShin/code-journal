var $form = document.querySelector('form');
var $photoURL = document.querySelector('#photo-url');
var $placeholder = document.querySelector('.placeholder');
var $entryForm = document.querySelector('div[data-view="entry-form"]');
var $entries = document.querySelector('div[data-view="entries"]');

$photoURL.addEventListener('change', function (event) {
  if ($photoURL.value === '') {
    $placeholder.src = 'images/placeholder-image-square.jpg';
    return $placeholder;
  }
  $placeholder.src = $form.elements.photo.value;
});

// var $entryContainer = document.querySelector('.entry-container');
// var $noEntry = $entryContainer.prepend(renderNoEntry());

$form.addEventListener('submit', function (event) {
  event.preventDefault();

  var entry = {
    title: $form.elements.title.value,
    photo: $form.elements.photo.value,
    notes: $form.elements.notes.value,
    entryId: data.nextEntryId
  };

  data.nextEntryId++;

  data.entries.unshift(entry);
  $placeholder.src = 'images/placeholder-image-square.jpg';
  $form.reset();

  var p = document.querySelector('.exit');
  p.remove();
  $entryForm.className = 'hidden';
  $entries.className = 'show';
  window.location.reload();
});

var $entryList = document.querySelector('#entry-list');
document.addEventListener('DOMContentLoaded', function (event) {
  // console.log('document.loaded');
  for (var entryIndex = 0; entryIndex < data.entries.length; entryIndex++) {
    var $entry = renderEntry(data.entries[entryIndex]);
    $entryList.appendChild($entry);
  }
});

function renderEntry(entry) {
  // <li>
  //   <div class="row">
  //     <div class="column-half">
  //       <img src="https://miro.medium.com/max/1400/1*G0or3nXOtD3vVEvyEbCldQ.png" alt="Ada Lovelace">
  //     </div>
  //     <div class="column-half">
  //       <p class="title">Ada Lovelace</p>
  //       <p class="notes">Augusta Ada King, Countess of Lovelace was an English mathematician and writier,
  //         chiefly known for her work on Charles Babbage's propsed mechanical general-purpose computer,
  //         the Analytical Engine.
  //         She was the first to recognize that the machine had applications beyond pure calculation, and to
  //         have published the first algorithm intended to be carried out by such a machine.
  //       </p>
  //     </div>
  //   </div>
  // </li>

  var $entry = document.createElement('li');

  var $row = document.createElement('div');
  $row.setAttribute('class', 'row');

  var $columnHalf = document.createElement('div');
  $columnHalf.setAttribute('class', 'column-half column-top');

  var $img = document.createElement('img');
  $img.setAttribute('src', entry.photo);

  var $secondColumnHalf = document.createElement('div');
  $secondColumnHalf.setAttribute('class', 'column-half column-top');

  var $title = document.createElement('p');
  $title.setAttribute('class', 'title');
  $title.textContent = entry.title;

  var $notes = document.createElement('p');
  $notes.setAttribute('class', 'notes');
  $notes.textContent = entry.notes;

  $entry.append($row);
  $row.append($columnHalf);
  $columnHalf.append($img);
  $row.append($secondColumnHalf);
  $secondColumnHalf.append($title);
  $secondColumnHalf.append($notes);

  return $entry;
}

var $newButton = document.querySelector('.new');
$newButton.addEventListener('click', function (event) {
  $entryForm.className = 'show';
  $entries.className = 'hidden';
});

var $entryButton = document.querySelector('.entry-header');
$entryButton.addEventListener('click', function (event) {
  $entries.className = 'show';
  $entryForm.className = 'hidden';
});

// function renderNoEntry() {
//   var $noEntry = document.createElement('div');
//   $noEntry.setAttribute('class', 'row no-entry');
//   var $noEntryColumn = document.createElement('div');
//   $noEntryColumn.setAttribute('class', 'column-full');
//   $noEntry.appendChild($noEntryColumn);
//   var $paragraph = document.createElement('p');
//   $paragraph.setAttribute('class', 'no-entries');
//   $paragraph.textContent = 'No entries have been recorded';
//   $noEntryColumn.appendChild($paragraph);

//   return $noEntry;
// }

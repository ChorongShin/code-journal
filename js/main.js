/* data */
var $form = document.querySelector('form');
var $photoURL = document.querySelector('#photo-url');
var $placeholder = document.querySelector('.placeholder');

$photoURL.addEventListener('change', function (event) {
  if ($photoURL.value === '') {
    $placeholder.src = 'images/placeholder-image-square.jpg';
    return $placeholder;
  }
  $placeholder.src = $form.elements.photo.value;
});

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
});

$(document).ready(function () {
  const $galleryTrack = $('#galleryTrack');
  const $items = $galleryTrack.children();
  const itemWidth = 500; // width + spacing buffer
  let currentIndex = 0;
  const maxIndex = $items.length;

  function scrollGallery(direction) {
    currentIndex = (currentIndex + direction + maxIndex) % maxIndex;
    $galleryTrack.css('transform', `translateX(-${currentIndex * itemWidth}px)`);
  }

  $('.nav-button.left').on('click', function () {
    scrollGallery(-1);
  });

  $('.nav-button.right').on('click', function () {
    scrollGallery(1);
  });
});
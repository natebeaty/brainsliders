// quickie keyboard controlled slideshow w/ mp3 and video and autotimer support
// nate@clixel.com

var title = 'Brainsliders';
var full_screen_images = false; // set to true for fullscreen images
var cross_fade = false; // set to true for crossfaded images
var num_slides = 0;
var slide_at = -1;
var mp3_playing = '';
var direction = 'right';
var auto_timer;

var slides = [

  { bgcolor: '#000', image: 'ned-beattycat.jpg', mp3: '', mp3_start: 0, video: '', auto: 0 },
  { bgcolor: '#000', image: 'lance-reddick.jpg', mp3: '', mp3_start: 0, video: '', auto: 0 },
  // make as many copies of the above as you need

];

$(document).ready(function() {
  num_slides = slides.length;
  $('#slides').toggleClass('crossfade', cross_fade);
  $('#slides').toggleClass('fullscreen', full_screen_images);

  $('#go').removeClass('hidden').click(function() {
    _nextSlide();
    return false;
  });

  $.each(slides, function(i, el) {
    var $li = $('<li />').appendTo('#slides');
    if (el.image != '') {
      $('<img />').attr({'src': 'img/'+el.image}).imagesLoaded(function() {
        if (!full_screen_images) {
          $(this).css({'marginLeft': -($(this).width()/2), 'marginTop': -($(this).height()/2) });
        }
      }).appendTo($li);
    } else if (el.video != '') {
      $('<video width="1280" height="800" autoplay="autoplay"><source src="videos/' + el.video + '" type="video/mp4" /></video>').appendTo($li);
      $li.addClass('video');
    }
  });

  $('#jplayer').jPlayer({
    preload:'auto'
  });

  if (window.location.hash) {
    // ghetto history
    _slideTo(window.location.hash.replace('#',''));
  }

});

$(document).keydown(function(e) {
  if (e.which==39 || e.which==32) {
    _nextSlide();
    e.preventDefault();
  }
  else if (e.which==37) {
    _prevSlide();
    e.preventDefault();
  }
  else if (e.which==27) {
    window.location = 'index.html';
  }
});

function _prevSlide() {
  direction = 'left';
  _slideTo(--slide_at);
}

function _nextSlide() {
  direction = 'right';
  _slideTo(++slide_at);
}

function _slideTo(to) {
  if (typeof to != 'undefined') slide_at = to;
  if (auto_timer) clearTimeout(auto_timer);

  $('#go').addClass('hidden');

  if (slide_at < 0) slide_at = 0;
  if (slide_at > (num_slides-1)) slide_at = (num_slides-1);

  $('#slides li').removeClass('active');
  $('#slides li').eq(slide_at).addClass('active');

  if (slides[slide_at].video != '') {
    var video = $('#slides li').eq(slide_at).find('video')[0];
    if (video.currentTime>0) {
      video.currentTime = 0;
    }
    video.play();
  } else {
    $('video').each(function() {
      this.pause();
    });
  }

  document.title = title + slides[slide_at].image + (mp3_playing ? ' - ' + mp3_playing : '');
  if ((direction == 'right' && slides[slide_at].mp3) || (slides[slide_at].mp3 && !mp3_playing)) {
    _playMp3();
  }

  $('body').css('background', slides[slide_at].bgcolor);
  window.location.hash = '#' + slide_at;

  if (slides[slide_at].auto != 0) {
    auto_timer = setTimeout(function() {
      _slideTo(parseInt(slide_at) + 1);
    }, slides[slide_at].auto * 1000);
  }
}

function _playMp3() {
  $('#jplayer').jPlayer('setMedia', {
     mp3: 'mp3/' + slides[slide_at].mp3
   }).jPlayer('play', slides[slide_at].mp3_start);
  mp3_playing = slides[slide_at].mp3;
}

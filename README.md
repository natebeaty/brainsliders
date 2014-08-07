BRAINSLIDERS
============

Quickie keyboard controlled slideshow w/ mp3 and video and autotimer support.

- Originally made for [Aaron Renier's performance at Brain Frame 5][bf5]
- Then used for [Jeremy Tinder's performance at Brain Frame 9][bf9]
- Then added video support for [my own performance at Brain Frame 12][bf12]
- Finally, added auto_timer support for the [Brain Frame 19 finale][bf19].

After watching people struggle while projected on a giant screen in front of an audience navigating Finder + Preview + View > Enter Full Screen, sometimes trying to queue up songs on iTunes, and even worse, switching back to Finder to open a video mid-slideshow, I put this together.

Not terribly user-friendly atm, but I built it for myself. Still handy as a jumping point if you want a quick, customizable slideshow to run locally off your laptop. (Just double click index.html after putting up your own images and editing slides.js.)

Starts with a placeholder page (that I change like a total nerd for every show). You can click on it to start, or press right arrow or space to progress to next slide. Left arrow goes back a slide. Esc reloads the site/app/whateverthisis, jumping you back to the placeholder page.

Mp3s will only play if you are progressing forward, so you can go back a few slides without restarting the music if you skipped ahead accidentally.

Upload images to /img/, mp3s to /mp3/, and videos to /videos/, then edit the *slides* array in /js/slides.js.

Per-slide options:

	bgcolor: '#000'

sets the background color for the slide

	image: 'black.png'

slide image filename, loads from /img/filename

	mp3: ''

optional mp3 filename, will load from /mp3/filename

	mp3_start: 0

optional ability to start midway into an mp3, in seconds

	video: ''

if image is not set and video *is* set, it will load & autoplay a video from /videos/filename

	auto: 0

will set a autotimer to jump to next slide if > 0.

<hr>

There are also a few options at the top of slides.js:

	var full_screen_images = false;

set to true for fullscreen images (otherwise it will center the image, best for smaller panels)

	var cross_fade = false;

set to true for crossfaded images (this felt weird for comics but it can be nice if you use this for something else)


[bf5]: http://brainframe.tumblr.com/post/21352024784/aaron-renier-in-full-tomato-head-reads-his-comic
[bf9]: http://brainframe.tumblr.com/post/38761990582/jeremy-tinder-was-physically-absent-last-brain
[bf12]: http://brainframe.tumblr.com/post/53279413574/nate-beaty-debuted-chapter-three-of-liberty-crew
[bf19]: http://brainframe.tumblr.com/post/93119677383/announcing-the-poster-for-brain-frame-19-3rd
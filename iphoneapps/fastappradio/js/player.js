$(function() {
	var timeMatches = $('#progress-time .total').html().match(/(.*):(.*)/);
	var totalSeconds = (parseInt(timeMatches[1]) * 60 + parseInt(timeMatches[2]));
	var playedSeconds = 0;
	var paused = false;

	var Music = {
		advance: function() {
			setTimeout(function(){
				if(paused) return;
				playedSeconds += 1;

				var currentMinutes = parseInt(playedSeconds / 60);
				var currentSeconds = playedSeconds % 60;
				if (currentSeconds < 10) currentSeconds = "0" + currentSeconds;

				var playedTime = currentMinutes + ":" + currentSeconds;
				var playedPercent = (playedSeconds * 100 / totalSeconds);

				$('#current-progress').css('width', playedPercent + '%');
				$('#progress-time .current').html(playedTime);
				
				if(playedSeconds <= totalSeconds) Music.advance();
			}, 1000);
		},
		play: function(event) {
			event.preventDefault();
			$('#play, #pause').toggle();
			paused = false;
			Music.advance();
		},
		pause: function(event) {
			event.preventDefault();
			$('#play, #pause').toggle();
			paused = true;
		}
	};
	$('#play').click(Music.play);
	$('#pause').click(Music.pause);
});
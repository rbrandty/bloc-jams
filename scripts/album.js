var createSongRow = function (songNumber, songName, songLength) {
    var template =
        '<tr class="album-view-song-item">' +
        '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>' +
        '  <td class="song-item-title">' + songName + '</td>' +
        '  <td class="song-item-duration">' + songLength + '</td>' +
        '</tr>';

        return $(template);
};
var setCurrentAlbum = function (album) {
     currentAlbum = album;
     var $albumTitle = $('.album-view-title');
     var $albumArtist = $('.album-view-artist');
     var $albumReleaseInfo = $('.album-view-release-info');
     var $albumImage = $('.album-cover-art');
     var $albumSongList = $('.album-view-song-list');


     $albumTitle.text(album.title);
     $albumArtist.text(album.artist);
     $albumReleaseInfo.text(album.year + ' ' + album.label);
     $albumImage.attr('src', album.albumArtUrl);

    // clear contents of album song list container
    $albumSongList.empty();

    // build list of songs from album JavaScript object
    for (var i = 0; i < album.songs.length; i++) {
        var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
         $albumSongList.append($newRow);
    }
}

var updatePlayerBarSong = function() {

    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.artist);
  
    $('.main-controls .play-pause').html(playerBarPauseButton);
};

var findParentByClassName = function(element, targetClass) {
    if (element) {

        var currentParent = element.parentElement;
        while (currentParent.className !== targetClass && currentParent.className !== null) {
            currentParent = currentParent.parentElement;

            if (currentParent === null) {
                console.log("No parent found");
            }
        }

        if (currentParent.className !== targetClass) {
            console.log("No parent found with that class name");
        }

        return currentParent;
    }
};

var getSongItem = function(element) {
    switch (element.className) {
        case 'album-song-button':
        case 'ion-play':
        case 'ion-pause':
            return findParentByClassName(element, 'song-item-number');
        case 'album-view-song-item':
            return element.querySelector('.song-item-number');
        case 'song-item-title':
        case 'song-item-duration':
            return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
        case 'song-item-number':
            return element;
        default:
            return;
    }  
};

var clickHandler = function(targetElement){

    var songItem = getSongItem(targetElement);

    if (currentlyPlayingSong === null) {
        songItem.innerHTML = pauseButtonTemplate;
        currentlyPlayingSong = songItem.getAttribute('data-song-number');

    } else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')) {
        songItem.innerHTML = playButtonTemplate;
        currentlyPlayingSong = null;

    } else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
        var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
        currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
        songItem.innerHTML = pauseButtonTemplate;
        currentlyPlayingSong = songItem.getAttribute('data-song-number');
    }
};

var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var songRows = document.getElementsByClassName('album-view-song-item');

// Album button templates
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';

// Store state of playing songs

 var currentAlbum = null;
 var currentlyPlayingSongNumber = null;
 var currentSongFromAlbum = null;

window.onload = function() {
    setCurrentAlbum(albumPicasso);

    songListContainer.addEventListener('mouseover', function(event) {
        // #1
        if (event.target.parentElement.className === 'album-view-song-item') {
            event.target.parentElement.querySelector('.song-item-number').innerHTML = playButtonTemplate;
            var songItem = getSongItem(event.target);

            if (songItem.getAttribute('data-song-number') !== currentlyPlayingSong) {
                songItem.innerHTML = playButtonTemplate;
            }
        }
    });

    for (var i = 0; i < songRows.length; i++) {
        songRows[i].addEventListener('mouseleave', function(event) {
            // #1
            var songItem = getSongItem(event.target);

            var songItemNumber = songItem.getAttribute('data-song-number');
            // #2
            if (songItemNumber !== currentlyPlayingSong) {
                songItem.innerHTML = songItemNumber;
            }

        });

        songRows[i].addEventListener('click', function(event) {
            clickHandler(event.target);
        });
    }
}

    var albums = [albumPicasso, albumMarconi, albumHotFuss];
    var index = 1;
    albumImage.addEventListener("click", function(event) {
        setCurrentAlbum(albums[index]);
        index++;
        if (index == albums.length) {
            index = 0;
        }
    });

window.onload = function() {
        setCurrentAlbum(albumPicasso);

        var albums = [albumPicasso, albumMarconi, albumHotFuss];
        var index = 1;
        albumImage.addEventListener("click", function(event) {
            setCurrentAlbum(albums[index]);
            index++;
            if (index == albums.length) {
                index = 0;
            }
        });
};
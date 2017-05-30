var myImage = document.querySelector('img');
var numberOfDoggos = document.querySelector('numberOfDoggos')
var doggoCredits = document.querySelector('doggoCredits');
var myContributors = document.querySelector('contributors');

//In case of refactoring of database
var albumID = 'n2j6O';
var communityAlbumID = '88ffz';
var clientID = '45824da8413bab5';

var albumURL = 'https://api.imgur.com/3/album/' + albumID + '/images.json'
var communityAlbumURL = 'https://api.imgur.com/3/album/' + communityAlbumID + '/images.json'

//Only call it once, dont want to have too many requests
var doggoArray = JSON.parse(getDoggoAlbumJson(albumURL));
var communityDoggoArray = JSON.parse(getDoggoAlbumJson(communityAlbumURL));

//Array lengths are extensively used
var commmunityAlbumSize = communityDoggoArray.data.length;
var defaultAlbumSize = doggoArray.data.length;
var totalSize = commmunityAlbumSize+defaultAlbumSize;

function isFacebookApp() {
    var ua = navigator.userAgent || navigator.vendor || window.opera;
    return (ua.indexOf("FBAN") > -1) || (ua.indexOf("FBAV") > -1);
}

function changeDoggo()
{ 
    if(isFacebookApp()) {
        myImage.setAttribute ('src', 'images/zuckerberg.jpg');
        doggoCredits.innerHTML = 'It seems you are using that pesky Facebook/Messenger in-app browser. Unfortunaly Uncle Mark is <br> not very nice' +
        ', but don\'t fret! You can simply use <b>Google Chrome/Safari</b> on your phone and Doggo Generator will work just <b>fine</b>';
    } else {
        //Decide which album to use for credits if is a community doggo, the larger the album the most likely it is to be chosen
        var random = Math.floor ((Math.random() *totalSize)+1);
        //Get content to show on the page
        var doggo;
        var album;
        (random < defaultAlbumSize) ? album = doggoArray : album = communityDoggoArray;
        doggo = getDoggo(album);
        myImage.setAttribute ('src', doggo.link);
        //Give proper credit
        if(album==doggoArray) {
            doggoCredits.innerHTML = 'This doggo was uploaded by: <b>Hamitay</b>'; 
        } else {
            doggoCredits.innerHTML = 'This doggo was uploaded by: <b>' + doggo.description + "</b>";
        }
    }
}

function getDoggoAlbumJson(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    var imageJSONArray = '';
    xmlHttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            imageJSONArray = this.responseText;
        }else
            return 'Error loading doggo :(';
    }
    
    xmlHttp.open ("GET", theUrl, false);
    xmlHttp.setRequestHeader('Authorization','Client-ID 45824da8413bab5');    
    xmlHttp.send();
    return imageJSONArray;
}
        
function getDoggoNumber() {
   numberOfDoggos.innerHTML = 'We currently have <b>' + (doggoArray.data.length+communityDoggoArray.data.length) + '</b> doggos in our database';
}

function getDoggo(album) {
    var doggo = album.data[Math.floor(Math.random()*album.data.length)];
    return doggo;
}

function getContributors() {
    var contributors = [];

    //Populates the array with the contributors names
    for(var i = 0; i < commmunityAlbumSize; i ++) {
        if(i < commmunityAlbumSize) {
            var user = {name: communityDoggoArray.data[i].description, n:1}
            
            var duplicate = false;
            for(j = 0; j < contributors.length; j++) {
                if(user.name == contributors[j].name) { 
                    contributors[j].n++;
                    duplicate = true;
                }
            }
            if(!duplicate)
                contributors.push(user);
        }
    }
    //Sorts the colection
    contributors.sort(function(a,b) {
        return b.n - a.n;
    });

    //Creates the list
    var list = '';
    for(var i = 0; i < contributors.length; i ++) {
        list+= '<li><p>' + contributors[i].name + " " + contributors[i].n+ '</p></li>';
    }

    myContributors.innerHTML = '<ul>' + list + '</ul>';

}
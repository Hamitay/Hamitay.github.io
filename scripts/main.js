var myImage = document.querySelector('img');
var myError = document.querySelector('errorTag');
var mySolution = document.querySelector('solutionTag');

var albumURL = 'https://api.imgur.com/3/album/n2j6O/images.json';
var clientID = '45824da8413bab5';

myImage.onclick = function() {
    var doggo = getDoggo();
    myImage.setAttribute ('src', doggo);
}

    var clientID = '45824da8413bab5';
    var clientSecret = '126c3b51f2303173c6e912b9338544370d3b8467';


    function getDoggoAlbumJson(theUrl)
    {
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
        
    function getDoggo()
    {
        var doggoArray = JSON.parse(getDoggoAlbumJson(albumURL));
        
        //Now chooses a random doggo
        var doggo = doggoArray.data[Math.floor(Math.random()*doggoArray.data.length)].link;
        
        return doggo;
    }

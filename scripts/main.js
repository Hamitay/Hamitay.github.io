var myImage = document.querySelector('img');
var myError = document.querySelector('errorTag');
var mySolution = document.querySelector('solutionTag');

myImage.onclick = function() {
    var mySrc = myImage.getAttribute('src');
    if(mySrc == 'images/husky.png') {
        myError.textContent = "HTPP 200: Doggo is now fine";
        mySolution.textContent = "The means of production have been seized, congratulations comrade, bork!";
        mySolution.style.color = "red";
    } else {
        myImage.setAttribute ('src', 'images/husky.png');
    }
}
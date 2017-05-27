    var clientID = '45824da8413bab5';
    var clientSecret = '126c3b51f2303173c6e912b9338544370d3b8467';


    function httpGet(theUrl)
    {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open ("GET", theUrl, false);
        xmlHttp.send(null);
        return xmlHttp.responseText;
    }
        
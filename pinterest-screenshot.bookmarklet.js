function createWebsitePin(linkURL, imageURL) {
        
    var url = "http://pinterest.com/pin/create/button/?url=" 
      + encodeURIComponent(linkURL) 
      + "&media=" 
      + encodeURIComponent(imageURL) 
      + "&description=" 
      + encodeURIComponent("Screenshot of " + linkURL);
    var newWindow = window.open(url, "", "scrollbars=yes,menubar=yes,height=1024,width=1024,resizable=yes,toolbar=yes,location=yes,status=yes");
}

var imageURL = window.prompt("Enter the URL of the screenshot to pin:", 'http://evolvingweb.ca/sites/default/files/ew-banner-responsive.png')
createWebsitePin(window.location.href, imageURL);

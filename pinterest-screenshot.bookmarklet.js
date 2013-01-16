function createWebsitePin(linkURL, imageURL) {
        
    var url = "http://pinterest.com/pin/create/button/?url=" + encodeURIComponent(linkURL) + "&media=" + encodeURIComponent(imageUrl) + "&description=" + encodeURIComponent("Screenshot of " + websiteURL);
    var newWindow = window.open(url, "", "scrollbars=yes,menubar=yes,height=1024,width=1024,resizable=yes,toolbar=yes,location=yes,status=yes");
}
createWebsitePin(window.location.href, 'http://evolvingweb.ca/sites/default/files/ew-banner-responsive.png')
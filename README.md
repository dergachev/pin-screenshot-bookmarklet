## Pin Screenshot bookmarklet

The __Pin Screenshot__ bookmarklet allows you to post a screenshot of the current page to Pinterest. Requires own screenshot tool, such as github.com/dergachev/copy-public-url. 

## Placeholder screenshot:

![Screenshot](http://dl-web.dropbox.com/u/8325927/screenshots/NJTPYR-2013.1.14-14.36.png)


## Installation

To install, visit http://bl.ocks.org/d/4548565

## Developing

```
# consider forking this gist
git clone https://gist.github.com/4548565.git pin-screenshot
cd pin-screenshot
python -m SimpleHTTPServer 9092 # serves http://localhost:9092/index.html
```

## Dev Notes

### pinterest blocks dl-web.dropbox.com

I noticed that pinterest blocks pinning any images on the domain
dl-web.dropbox.com, which is a problem as copy-public-url tool uploads them to
dl-web.dropbox.com.

https://support.pinterest.com/entries/21436306-why-is-my-pin-or-site-blocked-for-spam-or-inappropriate-content/

Possible workarounds:

* in the JS, run s/dl-web.dropbox.com/107.20.134.231/
 - **This is what is currently implemented.**
 - hardcodes the IP address (currently 107.20.134.231) that dl-web.dropbox.com resolves to.
 - Will break when/if dropbox changes AWS servers (might do so very soon)
 - requires that dl-web.dropbox.com servers dont care about HOST http header (true for now)
 - Unfortunately there's no JS method for DNS resolution, but can use webservice
   - http://dotnul.com/api/dns/dotnul.com/A?callback=jsonp
   - http://dig.jsondns.org/IN/dl-web.dropbox.com/A?callback=jsonp
     - a bit slow, but works!
   - will probably require loading jQuery, as well as webservice call
* create a proxy service (dl-web-dropbox-com-proxy.appengine.com) that proxies to dl-web.dropbox.com.
 - robust but expensive on bandwidth; free might run over quota
* create DNS subdomain as follows: dl-web-dropbox-com-cname.freedns.org
 - free, easy, robust 
 - though requires registration with free dns service provider (eg http://www.homenet.org/)
 - requires that dl-web.dropbox.com servers dont care about HOST http header (true for now)
 - see http://fredericiana.com/2012/12/09/custom-domain-with-dropbox/
 - http://fredericiana.com/2012/12/09/custom-domain-with-dropbox/
 - good idea to have a custom domain for dropbox anyways, since if dropbox changes TOS your links might all break
* jsonp to a URL shortener with jsonp API
 - bit.ly supports jsonp, but requires registration for API Key
   - http://stackoverflow.com/questions/5918351/please-help-with-jquery-url-bit-ly-shortener
   - http://stackoverflow.com/questions/1771397/jquery-on-the-fly-url-shortener?lq=1
 - goo.gl doesnt seem to have a jsonp api, so would need to combine with yql jsonp proxy
 - also see:
   - http://stackoverflow.com/questions/1414145/create-tinyurl-via-jquery-ajax-call
   - http://tiny-url.info/open_api.html
 - if need to proxy to get jsonp support, then point of failure is introduced

### Other Resources

* http://snapito.com/ provides an almost identical bookmarklet, except the screnshot is taken and upload by their servers, which is free but often sluggish.
* http://stackoverflow.com/questions/9514698/bypass-popup-blocker-on-window-open-when-jquery-event-preventdefault-is-set
* https://github.com/dergachev/copy-public-url/issues/3 (original issue tracking this idea)

## Pretty webpages to screenshot

Just in case you need some inspiration:

* http://visualsupply.co/film
* http://urbanairship.com/news-and-events
* http://sebtoots.com/




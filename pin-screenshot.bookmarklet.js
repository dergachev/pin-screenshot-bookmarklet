function initMyBookmarklet() { 
  createSimpleDialog("Enter the URL of the screenshot to pin:", function(imageURL) { 
    if (imageURL) { 
      imageURL = fixDropboxBlock( imageURL); 
      createWebsitePin(window.location.href, imageURL);
    }
  });
}

function createSimpleDialog(question, successHandler) {
  var label = jQuery('<label />')
    .text(question)
    .css({
      'padding-top': '30px'
    });
  var input = jQuery('<input type="text" class="simpleDialogQuestion" />')
    .css({ 
      width: '90%', 
      display: 'block',
      padding: '2px',
      margin: '10px 0px',
    })
    .appendTo(label);

  var removeDialog = function() { 
    jQuery('.simpleDialog').remove();
  }

  var submitButton = jQuery('<input type="image" src="http://passets-cdn.pinterest.com/images/bm/button.png" />')
    .css({
      border: 'none'
    })
    .click(function() { 
      var answer = input.val();
      successHandler(answer);
      removeDialog();
    });

  var cancelButton = jQuery('<button type="button">&times;</button>')
    .css({
      background: 'transparent',
      margin: '0',
      padding: '0',
      cursor: 'pointer',
      'font-size': '20px',
      color: 'black',
      opacity: '.2',
      border: 'none',
      'text-shadow': '0 1px 0 white',
      float: 'right'
    })
    .click(function() { 
    removeDialog();
  });

  var overlay = jQuery('<div class="simpleDialog simpleDialogOverlay" />')
    .css({
      width: '100%',
      height: '100%',
      opacity: '.5',
      'background-color': 'black',
      'z-index': '10000000',
      position: 'absolute'
    })
    .click(removeDialog)
    .prependTo('body');

  var dialog = jQuery('<div class="simpleDialog"/>')
    .append(cancelButton)
    .append(label)
    .append(submitButton);

  // wrap in iframe to protect from page CSS
  var iframe = jQuery('<iframe class="simpleDialog" />')
    .load(function() { 
      //populate iframe with dialog
      jQuery(this).contents().find('body').append(dialog);

      // position cursor on text box; 
      label.focus(); // note jQuery('.simpleDialogQuestion') fails in iframe 

      // dismiss on ESC keypress; adapted from http://stackoverflow.com/a/3581056/9621
      jQuery(document)
        .add( jQuery(this).contents()) // bind to top-level and frame  document
        .bind('keydown', function(e) { 
          if (e.which == 27) { removeDialog(); } // escape key
        }); 
    })
    .css( {
      width: '400px',
      height: '200px',
      left: '50%',
      position: 'absolute',
      top: '100px',
      left: '50%',
      'margin-left': '-200px',
      border: '1px solid grey',
      padding: '10px',
      opacity: '1',
      'z-index': '10000000',
      background: 'white'
    })
  .insertAfter(overlay);

}

function createWebsitePin(linkURL, imageURL) {
  //TODO: optimize title/description 
    var url = "http://pinterest.com/pin/create/button/" 
      + "?url=" + encodeURIComponent(linkURL) 
      + "&media=" + encodeURIComponent(imageURL) 
      + "&is_video=false"
      + "&title=" + encodeURIComponent("Screenshot of " + linkURL)
      + "&description=" + encodeURIComponent("Screenshot of " + linkURL);
    var newWindow = window.open(url, "", "scrollbars=yes,menubar=yes,height=1024,width=1024,resizable=yes,toolbar=yes,location=yes,status=yes");
}

// pinterest blocks images on the dl-web.dropbox.com domain, so workaround
function fixDropboxBlock(imageURL) { 
  var dropboxHostname = 'http://dl-web.dropbox.com';
  var dropboxIp = 'http://107.20.134.231';
  // TODO: implement something much more robust than hardcoding the IP
  return imageURL.replace(dropboxHostname, dropboxIp);
}

(function(){
    var done = false;
    var script = document.createElement("script");
    script.src = "//cdnjs.cloudflare.com/ajax/libs/yepnope/1.5.4/yepnope.min.js";
    script.onload = script.onreadystatechange = function(){
      if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
        done = true;
        requireDeps();
      }
    };
    document.getElementsByTagName("head")[0].appendChild(script);
})();

function requireDeps() {
  yepnope([{
      test: typeof(window.jQuery) === 'undefined' || jQuery.fn.jquery.match(/^1\.[0-9]+/) <= 1.4,
      yep: '//cdnjs.cloudflare.com/ajax/libs/jquery/1.4.4/jquery.min.js',
      complete: function (url, result, key) {
        initMyBookmarklet();
        // TODO: makes our jQuery version not clobber pre-existing one (eg for pinterest)
        // jQuery.noConflict(true) doesn't seem to work properly
      }
    } 
  ]);
}

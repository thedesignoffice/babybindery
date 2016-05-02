var pages = document.querySelectorAll(".page-content");
for (var i = 0; i < pages.length; i++) {
  var pg = pages[i];

  var links = document.querySelectorAll("a[href]");
  if (links) {
    for (var j = 0; j < links.length; j++) {
      var href = links[j].getAttribute("href");
      $("<sup data-footnote='" + href + "'>&rarr;</sup>").insertAfter(links[i]);
    }
  }

  var footnotes = $('sup');
  if(footnotes){
    var notes = pg.parentNode.querySelector(".page-footer").innerHTML;

  }
}

/*

    // [F] Footnotes
    var footnotes = pg.querySelectorAll("[data-footnote]");
    if(footnotes){
      var notes = ""; // don't make this more than 3 lines or so!
      for (var j = 0; j < footnotes.length; j++){
        var material = footnotes[j].getAttribute("data-footnote");
        var temp = material;

        // strip "http://"
        var start = temp.indexOf("://");
        var end = temp.length;
        if(start !== -1){
          start = start + 3;
          temp = temp.substring(start,end);
        }

        // strip "www."
        start = temp.indexOf("www.");
        end = temp.length;
        if(start !== -1){
          start = start + 4;
          temp = temp.substring(start,end);
        }

        footnotes[j].innertext = j; // set footnote number (instead of 'x'), each page starts at 0.
        $("sup[data-footnote='"+material+"']").html(j);
        notes += "&rarr;&nbsp;<i>"+j+"</i>&nbsp;"+temp+"<br />";
      }
      pg.parentNode.querySelector("._footer").innerHTML = notes;
    }

    */
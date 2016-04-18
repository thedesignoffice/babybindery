/*jshint laxcomma:true, multistr: true */

// This is the code that defines the design of the book
// and some minor UI of the book-maker, including
// picking which content is included, turning on/off crop
// marks, etc.

// ---------------
// User interface

var toggler = document.getElementById("toggleguides");
var togglecrop = document.getElementById("togglecrop");
var regionizer = document.getElementById("regionize");

if (toggler) toggler.addEventListener("click", toggleGuidesAndBleed);
if (togglecrop) togglecrop.addEventListener("click", toggleCropMarks);
if (regionizer) regionizer.addEventListener("click", Bindery.startBind);


// ==================
// React to checkbox

$(".toc [type=checkbox]").change(function(e){
  var id = this.parentNode.getAttribute("data-toc");
  var elt = document.querySelector('[data-id="' + id + '"]');

  if (!this.checked) {
    this.parentNode.parentNode.classList.add("_wont-print");
    $(elt).nextUntil("[data-id]").andSelf().attr("data-remove-before-print", true);
  }
  else {
    this.parentNode.parentNode.classList.remove("_wont-print");
    $(elt).nextUntil("[data-id]").andSelf().removeAttr("data-remove-before-print");
  }

});
// First lets uncheck them all!
$(".toc [type=checkbox]").attr("checked", false).change();

// -------------------------------------
// Enable UI when we know all images have loaded


// -------------------------------------
//
// R E G I O N I Z E R
//
// Load polyfill when we know all images have loaded


// -------------------------------------

var progbar = document.getElementById("progbar");
var stat = document.getElementById("bindStatus");
var pages = document.querySelectorAll(".page-outer").length;
function reportPagesLeft(p) {
  var done = pages - p;
  stat.innerHTML = "Building page " + done;
  progbar.value = done / pages;
}


stat.innerText = "Loading images...";
imagesLoaded( document.body, function( instance ) {
  if (regionizer) {
    regionizer.removeAttribute("disabled");
    stat.innerText = "Ready";
  }
});



// -------------------------

// Toggle guides

// -------------------------

function toggleGuidesAndBleed(e) {
  // e.preventDefault();
  if (document.documentElement.classList.contains("_guides")) {
    document.documentElement.classList.remove("_guides");
  }
  else {
    document.documentElement.classList.add("_guides");
  }
}


function toggleCropMarks(e) {
  // e.preventDefault();
  if (document.documentElement.classList.contains("_cropmarks")) {
    document.documentElement.classList.remove("_cropmarks");
  }
  else {
    document.documentElement.classList.add("_cropmarks");
  }
}







// ==============================================================
// The following is ssome crude javascript
// preprocessing to prepare the content for being flowed
// over the pages, for after the bind is done.
//



// -------------------------
// Split image spreads in half so they can span two pages


Bindery.beforeBind(function(){
  var imageSpreads = document.querySelectorAll("[data-imagespread]");
  for (var i = 0; i < imageSpreads.length; i++) {
    var oldNode = imageSpreads[i];
    var src = oldNode.querySelector("img").src;

    var splitImageHtml = ' \
      <div class="_dontpage-break"></div>\
      <div class="_book-spread-l" data-fullbleed>\
        <img src="' + src + '"/>\
      </div>\
      <div class="_book-spread-r" data-fullbleed>\
        <img src="' + src + '"/>\
      </div> \
      <div class="_dontpage-break"></div>';

    $(splitImageHtml).insertAfter(oldNode);
    oldNode.parentNode.removeChild(oldNode);
  }
});

// CLS: we do this later




// -------------------------
// [D] Swap GIFs out for fixed PNG version
// requires there be a .png version of the frame people want in print.

Bindery.beforeBind(function(){
  var num_images = $("img").length;
  for(i=0; i<num_images; i++){
    var src = $("img").eq(i).attr("src");
    var end = src.length;
    var start = end-4;

    if(src.substring(start,end)==".gif" || src.substring(start,end)==".GIF"){
      //alert("WE FOUND ONE LADDY!");
      // swap out PNG extension with fixed frame for printing
      $("img").eq(i).attr("src",src.substring(0,start)+".png");
    }
  }
});




// -------------------------
// [E] highlight Code

Bindery.beforeBind(function(){
  var snippets = document.querySelectorAll(".snippet");
  for (var i = 0; i < snippets.length; i++) {
    var snip = snippets[i];
    var ext = snip.getAttribute("data-mode");
    var mode = getMode(ext);
    var txt = snip.value;
    var insertNode = document.createElement("pre");
    insertNode.className = "snippet-ready cm-s-loop-light cm-mode-" + ext;

    $(insertNode).insertAfter(snip);
    $(snip).remove();

    CodeMirror.runMode(txt, mode, insertNode);
  }
  function getMode(ext) {
    if (ext == "html") return "text/html";
    else if (ext == "css") return ext;
    else if (ext == "scss") return "text/x-scss";
    else if (ext == "styl") return "text/x-scss";
    else if (ext == "md") return "text/x-markdown";
    else if (ext == "js") return "javascript";
  };
});





// -------------------------
// Let images bleed off edge of page

Bindery.afterBind({}, function(pg, state){
  var hasBleeds = pg.querySelector("[data-fullbleed]");
  if (hasBleeds) {
    pg.classList.add("_bleed");
  }
});

// CLS: later




// -------------------------
// Add footnotes to bottom of page

// Before binding, detect both hrefs and footnotes
Bindery.beforeBind(function(){
  var links = document.querySelectorAll("a[href]");
  if (links) {
    for (var i = 0; i < links.length; i++) {
      var href = links[i].getAttribute("href");
      $("<sup data-footnote='" + href + "'>x</sup>").insertAfter(links[i]);
    }
  }
  var footnotes = $("footnote");
  if(footnotes){
    for(var i=0; i< footnotes.length; i++){
      var material = footnotes.eq(i).html(); // this is working!!!
      $("<sup data-footnote='"+material+"'>x</sup>").insertAfter(footnotes.eq(i));
    }
  }
});

// After binding, move that text to the bottom of the page
Bindery.afterBind({}, function(pg, state){
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
});

// CLS: add later 



// -------------------------
// Check which kind of page (interview vs. project)

Bindery.afterBind({pageKind: ""}, function(pg, state){
  var pagekindchange = pg.querySelector("[data-change-page-kind]");
  if (pagekindchange) {
    state.pageKind = pagekindchange.getAttribute("data-category");
  }
  pg.parentNode.setAttribute("data-page-kind", state.pageKind);
});





// -------------------------
// Update table of contents

Bindery.afterBind({}, function(pg, state){

    // If there is an in-page heading
    var heading = pg.querySelector("[data-change-running-head]");
    if (heading) {
      // Add this page to the table of contents
      var id = heading.getAttribute("data-id");
      if (id) {
        var num = pg.parentNode.getAttribute("data-page");
        var tocLine = document.querySelector('.page-inner [data-toc="' + id + '"]');
        if (tocLine) tocLine.innerText = num;
      }
    }
});





// -------------------------
// Add running heads

Bindery.afterBind({ head: "", headUrl: "", intervName: ""}, function(pg, state){

    var isRecto = pg.parentNode.classList.contains("_recto") ? true : false;


    // [B] If there is an in-page heading designed to trigger a new running head
    var heading = pg.querySelector("[data-change-running-head]");
    if (heading) {
      state.headUrl = heading.getAttribute("data-pageurl");

      // If it was an interview heading, it's a special case
      if (heading.getAttribute("data-category") == "interview") {
        state.head = heading.getAttribute("data-interviewee") + " with " + heading.getAttribute("data-interviewer");
        state.intervName = heading.getAttribute("data-interviewee");
      }
      else {
        state.head = heading.innerText;
      }

    }

    pg.parentNode.setAttribute("data-page-interv", state.intervName);

    // [D] Set this page's running head to the current running head
    var runner = pg.parentNode.querySelector("._running-head ._section");
    if (runner) {
      if (!isRecto) {
        runner.innerHTML = "<span>" + state.head + "</span>";
      }
      else {
        runner.innerHTML = "<span class='_headurl'>" + state.headUrl + "</span>";
      }
    }

});

// CLS: do this later


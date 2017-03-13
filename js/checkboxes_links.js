function checkAll(){
  var inputs = document.getElementsByTagName('input');
  for(var i = 0; i < inputs.length; i++){
    if(inputs[i].type=='checkbox'){
      inputs[i].checked = true;
    }
  }
}

var remove_pages = function(){
  var n_pages = $(".page-content").length;
  console.log('There are '+n_pages+' pages.');
  var counter = 0;
  for(var i=0;i<n_pages;i++){
    var chosen_page = $(".page-content").eq(i);

    if(chosen_page.html() == "<cssregion></cssregion>"){
      //chosen_page.parents(".sheet").remove();
      chosen_page.parents(".sheet").css('display','none');
      counter += 1;
    }else if(chosen_page.html() == ""){
      //chosen_page.parents(".sheet").remove();
      chosen_page.parents(".sheet").css('display','none');
      counter += 1;
    }
  }
  console.log(counter + " sheets removed. Ready to print...");
  $("#trim_pages_button").css("text-decoration","line-through");
  $("#print_button").css("display","inline");
}

function writeLinks(links){

  var link_string = "";

  for(var i=0; i<links.length; i++){

    var link = links.eq(i);
    var name = link.html();
    var href = link.attr('href');
    var temp = href;

    // strip "http://"
    var start = temp.indexOf("://");
    var end = temp.length;
    if(start !== -1){
      start = start + 3;
      temp = temp.substring(start,end);
    }

    href = temp; // Now stripped & clean=looking.
    link_string = link_string + name+" &rarr; "+href+"<br>";
  }
  return link_string;
}

function refreshContent(){
  $(".sheet").css('display','block'); // Reverses anything hidden by remove_pages.
  $("#trim_pages_button").css("text-decoration","none");
  $("#print_button").css("display","none");
  $("#footnotes").html("");

  var n_checkboxes = $("input[type=checkbox]").length;
  var checked_contents = [];
  for(var i=0; i<n_checkboxes;i++){
    var n_checked = checked_contents.length;
    var checkbox = $('.menu-checkbox').eq(i);
    if(checkbox.is(':checked')){
      checked_contents[n_checked] = checkbox.attr('data-slug'); // checked_contents contains the numbers of the posts that should be flowed in.
    }
  }

  // Clear the slate, then re-flow.
  $('.content').css('display','none');
  $('.content').css('break-after','never');
  $('.post-in-toc').css('display', 'none');

  var links_html = "";
  n_checked = checked_contents.length;

  console.log(checked_contents);

  for(var j=0; j<n_checked; j++) {
    $('.content')
      .filter(function() {
        return $( this ).attr( "data-slug" ) === checked_contents[j];
      })
      .css( "display", "block" )
      .css('break-after','always')
      .parents().css('display','block');

    $('.post-in-toc')
      .filter(function() {
        return $( this ).attr( "data-slug" ) === checked_contents[j];
      })
      .css( "display", "block" );

    var links = $('.content').filter(function(){
      return $( this ).attr("data-slug") === checked_contents[j];
    }).find('a');


    // $('.content').attr(checked_contents[j]).parents().css('display','block'); // Display sheets of content types selected.
    // $('.content').attr(checked_contents[j]).css('display','block');
    // $('.post-in-toc').attr(checked_contents[j]).css('display', 'block');
    // $('.content').attr(checked_contents[j]).css('break-after','always'); // If this is in all .content blocks, even the hidden .content cause region-breaks. (so we only put it on visible ones)

    //var links = $('.content').attr(checked_contents[j]).find('a');
    links_html = links_html + writeLinks(links);
  }

  $("#footnotes").html(""+links_html);
}


// on loading...
$('.content').css('display','none');
checkAll();
refreshContent();

// on interaction...

$("#trim_pages_button").click(function(){
  remove_pages();
});

$("input[type=checkbox]").on("click", function(){
  refreshContent();
});

$("#print_button").click(function(){
  window.print();
});

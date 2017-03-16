function checkAll(){
  var inputs = document.getElementsByTagName('input');
  for(var i = 0; i < inputs.length; i++){
    if(inputs[i].type=='checkbox'){
      inputs[i].checked = true;
    }
  }
}

var trim_empty_pages = function(){
  var n_pages = $(".page-content").length;
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
  console.log(counter + " pages of original " + n_pages+ " trimmed. ");
  $("#trim_pages_button").css("text-decoration","line-through");
  $("#assign_pagenums_button").css("display","inline");
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

function get_checked_contents(){
  var n_checkboxes = $('.menu-checkbox').length;
  var checked_contents = [];
  for(var i=0; i<n_checkboxes;i++){
    var n_checked = checked_contents.length;
    var checkbox = $('.menu-checkbox').eq(i);
    if(checkbox.is(':checked')){
      checked_contents[n_checked] = checkbox.data('slug'); // checked_contents contains the numbers of the posts that should be flowed in.
    }
  }
  return [checked_contents];
}

function refreshContent(){
  console.log('Reflowing selected book content.');
  $(".sheet").css('display','block'); // Reverses anything hidden by trim_empty_pages.
  $("#trim_pages_button").css("text-decoration","none");
  $("#assign_pagenums_button").css("text-decoration","none");
  $("#assign_pagenums_button").css("display","none");
  $("#print_button").css("display","none");
  $("#footnotes").html("");

  var temp_array = get_checked_contents();
  var checked_contents = temp_array[0];

  // Clear the slate, then re-flow.
  $('.content').css('display','none');
  $('.content').css('break-after','never');
  $('.post-in-toc').css('display','none');

  var links_html = "";
  n_checked = checked_contents.length;

  for(var j=0; j<n_checked; j++) { // for each selected piece of content to be included
    var selected_content = $('.content')
      .filter(function() {
        return $( this ).data( "slug" ) === checked_contents[j];
      });

    selected_content
      .css( "display", "block" )
      .css('break-after','always')
      .parents().css('display','block');

    $('.post-in-toc')
      .filter(function() {
        return $( this ).data( "slug" ) === checked_contents[j];
      })
      .css( "display", "block" );

    links_html = links_html + writeLinks(selected_content.find('a'));
  }
  $("#footnotes").html(""+links_html);
}

function find_pages(){
  console.log('Finding page numbers.');
  var temp_array = get_checked_contents();
  var checked_contents = temp_array[0];
  var n_checked = checked_contents.length;

  for(var j=0; j<n_checked; j++) {
    var selected_content = $('.chapter-title')
      .filter(function(index) {
        return $( this ).data('slug') === checked_contents[j];
      });
    selected_content = selected_content.eq(0); // get the pre-flow one
    selected_content_slug = selected_content.data('slug');

    var css_regions_id = selected_content.data("css-regions-fragment-source");
    var selected_content_in_flow = $('.chapter-title').filter(function(){
      return $(this).data('css-regions-fragment-of') === css_regions_id;
    });
    selected_content_page_num = selected_content_in_flow.closest('.page').data('pagenum');

    var selected_content_in_toc = $('.pagenum').filter(function(){
      return $(this).data('slug') == selected_content_slug;
    }).html(selected_content_page_num);
    selected_content_in_toc = selected_content_in_toc.eq(1); // get the post-flow one
    console.log(selected_content_in_toc);
    console.log(selected_content_slug + ' is on page number ' + selected_content_page_num);
  }

  //console.log('');
  $("#assign_pagenums_button").css("text-decoration","line-through");
  $("#print_button").css("display","inline");
}

$(window).bind("load", function() {
  // on loading...
  $('.content').css('display','none');
  checkAll();
  refreshContent();
});

// on interaction...

$("#trim_pages_button").click(function(){
  trim_empty_pages();
});

$("#assign_pagenums_button").click(function(){
  find_pages(); // GOTTA ADD BUTTON FUNCTIONALITY ... !
});

$("input[type=checkbox]").on("click", function(){
  refreshContent();
});

$("#print_button").click(function(){
  window.print();
});

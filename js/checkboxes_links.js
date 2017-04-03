function checkAll(){
  var inputs = document.getElementsByTagName('input');
  for(var i = 0; i < inputs.length; i++){
    if(inputs[i].type=='checkbox'){
      inputs[i].checked = true;
    }
  }
}

function uncheckAll(){
  var inputs = document.getElementsByTagName('input');
  for(var i = 0; i < inputs.length; i++){
    if(inputs[i].type=='checkbox'){
      inputs[i].checked = false;
    }
  }
}

var trim_empty_pages = function(){
  var n_pages = $(".page-content").length;
  var counter = 0;
  for(var i=0;i<n_pages;i++){
    var chosen_page = $(".page-content").eq(i);

    if(chosen_page.html() == "<cssregion></cssregion>" || chosen_page.html() == ""){
      chosen_page.parents(".sheet").css('display','none');
      counter += 1;
    }
  }
  console.log(counter + " pages of original " + n_pages+ " trimmed. ");
}

function writeLinks(container){

  var links = container.find('a');

  var link_string = "";

  for(var i=0; i<links.length; i++){

    var link = links.eq(i);
    var name = "<strong>"+link.html()+"</strong>";
    var href = link.attr('href');

    var href = href.replace(/^https?\:\/\//i, "");

    var max_link_length = 75;

    if(href.length > max_link_length){
      href = href.substring(0,max_link_length);
      href = href+"...";
    }

    link_string = link_string + name+": "+href+"<br />";
  }
  return link_string;
}

function get_checked_contents(){
  var n_checkboxes = $('.menu-checkbox').length;
  var checked_contents = [];
  var checked_contents_chapters = [];
  for(var i=0; i<n_checkboxes;i++){
    var n_checked = checked_contents.length;
    var checkbox = $('.menu-checkbox').eq(i);
    if(checkbox.is(':checked')){
      checked_contents[n_checked] = checkbox.data('slug'); // checked_contents contains the numbers of the posts that should be flowed in.
      checked_contents_chapters[n_checked] = checkbox.data('chapter');
    }
  }
  return [checked_contents, checked_contents_chapters];
}

function refreshContent(){
  console.log('Reflowing selected book content.');
  $(".sheet").css('display','block'); // Reverses anything hidden by trim_empty_pages.
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
        return $( this ).data( "slug" ) === checked_contents[j]; // Need to grab the one in-flow.
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

    links_html = links_html + writeLinks(selected_content.eq(1));
  }
  $("#footnotes").html(""+links_html);
}

function assign_toc_pages(){
  console.log('Finding page numbers.');
  var temp_array = get_checked_contents();
  var checked_contents = temp_array[0];
  var checked_contents_chapters = temp_array[1];
  var n_checked = checked_contents.length;
  var page_numbers = [];

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
    page_numbers.push(selected_content_page_num);

    var selected_content_in_toc = $('.pagenum').filter(function(){
      return $(this).data('slug') == selected_content_slug;
    }).html(selected_content_page_num);

    //console.log(selected_content_slug + ' is on page number ' + selected_content_page_num);
  }

  for(var i = 0; i < $(".page-content").length; i++){
    var content_counter = 0;
    if(i < page_numbers[0]){
      // do nothing.
      // We're assuming page numbers increase linearly.
    }else{
      if(i < page_numbers[content_counter+1]){
        var header_in_flow = $('.page-header').eq(i);
        header_in_flow.html(checked_contents_chapters[content_counter]);
      }else{
        content_counter = content_counter + 1;
      }
    }
  }


  // Now filling in contextual page information.

  var n_pages = $(".page-content").length;

  let unique_chapters = [...new Set(checked_contents_chapters)];
  unique_chapters.sort();
  var unique_chapter_page_numbers = [];
  for(var k = 0; k < unique_chapters.length; k++) {
    unique_chapter_page_numbers.push(n_pages); // Set at maximum.
    for(var kk=0; kk < n_checked; kk++) {
      if(checked_contents_chapters[kk] == unique_chapters[k]) {
        if(page_numbers[kk] < unique_chapter_page_numbers[k]) {
          unique_chapter_page_numbers[k] = page_numbers[kk];
        }
      }
    }
  }

  unique_chapter_page_numbers.push(n_pages);
  unique_chapters.unshift('');

  for(var k = 0; k <= unique_chapters.length; k++) {
    var page_pointer = 0;
    var chapter_pointer = 0;
    while(page_pointer < n_pages) {
      if(page_pointer < unique_chapter_page_numbers[chapter_pointer]) {
        var contextual_info = $('.page-num').filter(function(){
          return $(this).html() == page_pointer;
        }).siblings('.page-footer').children('.contextual-info');
        contextual_info.html(unique_chapters[chapter_pointer]);
        page_pointer++;
      } else {
        chapter_pointer++;
      }
    }
  }

  // end Page Numbers Assignment Function
}

$(window).bind("load", function() {
  // on loading...
  $('.content').css('display','none');
  checkAll();
  refreshContent();
});

$("input[type=checkbox]").on("click", function(){
  refreshContent();
  $("#trim_pages_button").css("text-decoration","none");
  $("#assign_pagenums_button").css("text-decoration","none");
  $("#assign_pagenums_button").css("display","none");
  $("#refresh_button").css("display","none");
  $("#print_button").css("display","none");
});

$("#select_button").click(function(){
  checkAll();
  refreshContent();
});

$("#deselect_button").click(function(){
  uncheckAll();
  refreshContent();
})

$("#trim_pages_button").click(function(){
  trim_empty_pages();
  $("#trim_pages_button").css("text-decoration","line-through");
  $("#assign_pagenums_button").css("display","inline");
});

$("#assign_pagenums_button").click(function(){
  assign_toc_pages();
  $('.menu-checkbox').replaceWith(" X ");
  $("#assign_pagenums_button").css("text-decoration","line-through");
  $("#print_button").css("display","inline");
  $("#refresh_button").css("display","inline");
});

$("#refresh_button").click(function(){
  window.location.reload();
});

$("#print_button").click(function(){
  window.print();
});

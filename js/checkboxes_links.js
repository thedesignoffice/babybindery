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
  //console.log('There are '+n_pages+' pages.');
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
  console.log(counter + " sheets removed.");
}

$("#trim_pages_button").click(function(){
  remove_pages();
});


function writeLinks(){

  var links = $('.page-content').find('a');

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

    /*
    // strip "www."
    start = temp.indexOf("www.");
    end = temp.length;
    if(start !== -1){
      start = start + 4;
      temp = temp.substring(start,end);
    }
    */

    href = temp; // Now stripped & clean=looking.

    //$( "<span class='link_url'>"+href+"</span>" ).insertAfter(link); // This line currently not working. Going the css :after route for now.

    $("#footnotes").append(name+" &rarr; "+href+"<br />");

  }
}

function refreshContent(){
  $(".sheet").css('display','block'); // Reverses anything hidden by remove_pages.

  var n_checkboxes = $("input[type=checkbox]").length;
  var checked_contents = []; // contains string names of content types whose boxes are checked.
  for(var i=0; i<n_checkboxes;i++){
    var n_checked = checked_contents.length;
    if($('input[type=checkbox]').eq(i).is(':checked')){
      // Slice off the "checkbox-" prefix in id attribute.
      checked_contents[n_checked] = $('input[type=checkbox]').eq(i).attr('id').slice(9,$('input[type=checkbox]').eq(i).attr('id').length);
    }
  }
  $('.content').css('display','none'); // Clear the slate, then re-flow.
  $('.content').css('break-after','never');

  n_checked = checked_contents.length;
  for(var j=0;j<n_checked;j++){
    $('.content.'+checked_contents[j]).parents().css('display','block');
    $('.content.'+checked_contents[j]).css('display','block');
    $('.content.'+checked_contents[j]).css('break-after','always'); // If this is in all .content blocks, even the hidden .content cause region-breaks. (so we only put it on visible ones)

    // This line could be more informative.
    console.log('Flowing in '+checked_contents[j]+' contents.');
  }
}


// on loading...
$('.content').css('display','none');
checkAll();
refreshContent();
writeLinks();


$("input[type=checkbox]").on("click", function(){
  refreshContent();
});

function uncheckAll(){
  var w = document.getElementsByTagName('input');
  for(var i = 0; i < w.length; i++){
    if(w[i].type=='checkbox'){
      w[i].checked = false;
    }
  }
}


function writeLinks(){

  var links = $('.page-content').find('a');

  for(var i=0; i<links.length; i++){

    var link = links.eq(i);
    var href = link.attr('href');
    var temp = href;

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

    href = temp; // Now stripped & clean=looking.

    //$( "<span class='link_url'>"+href+"</span>" ).insertAfter(link); // This line currently not working. Going the css :after route for now.

  }
}

function refreshContent(){
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
    $('.content.'+checked_contents[j]).css('break-after','always'); // If this is in all of them, even the hidden .content cause region-breaks.

    // what should the correct display be here?
    console.log('Flowing in '+checked_contents[j]+' contents.');
  }

}


// on loading...
uncheckAll();
//writeLinks();
$('.content').css('display','none');


$("input[type=checkbox]").on("click", refreshContent );

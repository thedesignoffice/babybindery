function uncheckAll(){
  var w = document.getElementsByTagName('input');
  for(var i = 0; i < w.length; i++){
    if(w[i].type=='checkbox'){
      w[i].checked = false;
    }
  }
}


function writeFootnotes(){

  //var visible_links = $('a').filter(function(index){
  //  return $(this).css("display")!="none";
  //});

  var visible_links = $('.content').filter(function(index){
    return $(this).css("display")=="block";
  }).find('a');

  for(var i=0; i<visible_links.length; i++){

    var link = visible_links.eq(i);
    var href = link.attr('href');
    //console.log('Moving over link '+i+' which goes to url '+href);

    var temp = href;

    /*
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
    */

    href = temp; // Now stripped & clean=looking.

    $("<sup data-footnote='" + href + "'>"+i+"</sup>").insertAfter(link);

    var associated_page = link.parents('.page');
    var associated_footer = associated_page.find('.page-footer');
    console.log('Link '+href+' going into footer of page '+associated_footer.html());
    associated_footer.html('hey lukas what is up');
    //console.log(associated_footer);
    //temp = associated_footer.html()+'<br />'+href;
    //console.log(temp);
    //associated_footer.html(temp);

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

  n_checked = checked_contents.length;
  for(var j=0;j<n_checked;j++){
    $('.content.'+checked_contents[j]).css('display','block');
    console.log('Flowing in '+checked_contents[j]+' contents.');
  }

  writeFootnotes();
}


// on loading...
uncheckAll();
$('.content').css('display','none');


$("input[type=checkbox]").on("click", refreshContent );
//$("input[type=checkbox]").on("click", remove_pages );

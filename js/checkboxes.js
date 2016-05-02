function uncheckAll(){
  var w = document.getElementsByTagName('input');
  for(var i = 0; i < w.length; i++){
    if(w[i].type=='checkbox'){
      w[i].checked = false;
    }
  }
}

function writeFootnotes(){

  var links = $('a');
  for(var i=0; i<links.length; i++){

    var link = links.eq(i);
    var href = link.attr('href');
    //console.log('Moving over link '+i+' which goes to url '+href);

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

    $("<sup data-footnote='" + href + "'>"+i+"</sup>").insertAfter(link);



    //var associated_page = link.parents('.page');
    //console.log(associated_page);
    //var associated_footer = associated_page.find('.page-footer');
    //console.log(associated_footer);
    //temp = associated_footer.html()+'<br />'+href;
    //console.log(temp);
    //associated_footer.html(temp);

  }
}


function refreshContent(){
  var n_checkboxes = $("input[type=checkbox]").length;
  var checked_contents = []; // contains strings of content types that have checked boxes.
  for(var i=0; i<n_checkboxes;i++){
    var n_checked = checked_contents.length;
    if($('input[type=checkbox]').eq(i).is(':checked')){
      // Slice off the "checkbox-" prefix in id attribute.
      checked_contents[n_checked] = $('input[type=checkbox]').eq(i).attr('id').slice(9,$('input[type=checkbox]').eq(i).attr('id').length);
    }
  }
  $('.content').css('display','none');

  n_checked = checked_contents.length; // Update this...
  for(var j=0;j<n_checked;j++){
    $('.content.'+checked_contents[j]).css('display','block');
    console.log('Flowing in '+checked_contents[j]+' contents.');
  }

}



// on loading...
uncheckAll();
$('.content').css('display','none');
writeFootnotes();


$("input[type=checkbox]").on("click", refreshContent );
//$("input[type=checkbox]").on("click", remove_pages );

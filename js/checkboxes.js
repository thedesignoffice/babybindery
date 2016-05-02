function uncheckAll(){
  var w = document.getElementsByTagName('input');
  for(var i = 0; i < w.length; i++){
    if(w[i].type=='checkbox'){
      w[i].checked = false;
    }
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

  for(var j=0;j<n_checked;j++){
    $('.content.'+checked_contents[j]).css('display','block');
  }
}

// on loading...
uncheckAll();
refreshContent();

$("input[type=checkbox]").on("click", refreshContent );
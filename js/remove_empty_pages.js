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
  console.log(counter + " regions trimmed.");
}

$("#trim_pages_button").click(function(){
  remove_pages();
});


// Version from Bindery:
/*

// deletes any empty regions from the end of a flow:
function trimRegions(flowName) {
  var flow = document.getNamedFlows().namedItem(flowName);
  var index = flow.firstEmptyRegionIndex;
  console.log('First Empty Region Index... '+index);
  var regions = flow.getRegions();
  if (index == -1) return(false); // no empty regions?
  // remove first empty region &amp; all thereafter:
  for (var i = index; i < regions.length; i++){
    regions[i].parentNode.removeChild(regions[i]);
  }
  return(true);
}

trimRegions('toprint');

*/

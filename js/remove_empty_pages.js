var remove_pages = function(){
  var n_pages = $(".page-content").length;
  console.log('There are '+n_pages+' pages.');
  for(var i=0;i<n_pages;i++){
    var chosen_page = $(".page-content").eq(i);
    if(chosen_page.html() == "<cssregion></cssregion>"){
      chosen_page.remove();
      console.log("Removed page "+i);
    }else if(chosen_page.html() == ""){
      chosen_page.remove();
      console.log("Removed page "+i);
    }
  }
}

$("#trim_pages_button").click(remove_pages());


// Recommended version:
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

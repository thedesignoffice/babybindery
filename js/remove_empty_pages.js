var n_pages = $(".page-content").length;
console.log('There are '+n_pages+' pages.');
for(var i=0;i<n_pages;i++){
  var chosen_page = $(".page-content").eq(i);
  if(chosen_page.html() == "<cssregion></cssregion>"){
    chosen_page.remove();
    console.log("Removed page "+i);
  }
  if(chosen_page.html() == ""){
    chosen_page.remove();
    console.log("Removed page "+i);
  }
}

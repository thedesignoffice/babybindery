var n_conversations = $(".conversation").length;
for(var j=0; j<n_conversations;j++){
  var chosen_conversation = $(".conversation").eq(j);

  var n_paragraphs = chosen_conversation.children("p").length;

  for(var i=0; i<n_paragraphs; i++){
    var chosen_p = chosen_conversation.children("p").eq(i);
    var colon_index = chosen_p.html().indexOf(":");
    if(colon_index > 0 && colon_index < 7){
      // If there's a colon in first 7 characters (assuming initials smaller than that...)
      // If your speaker initials exceed 7 characters, adjust that number there.
      var p_contents = chosen_p.html();
      var initials = p_contents.slice(0,colon_index+1); // Slice up html based on where this early colon is. Include the colon!
      p_contents = p_contents.substr(colon_index+1,p_contents.length); // The +1 gets the space after the colon.

      var hyphen = initials.indexOf("-q");
      if(hyphen > 0){ // If there is a -q in the initials, i.e. it is a QUESTION
        initials = initials.slice(0,hyphen) +":"; // Remove the "-q:", add colon back on.
      }

      initials = "<span class='question'><span class='initials'>"+initials+"</span>";

      // Now recombine newly wrapped initials.
      if(hyphen > 0){
        p_contents = "<span class='conversation-question'>"+initials+p_contents;+"</span>";
      }else{
        p_contents = initials+p_contents;
      }
      chosen_p.html(p_contents); // Plop it into the paragraph.
    }
  }
}

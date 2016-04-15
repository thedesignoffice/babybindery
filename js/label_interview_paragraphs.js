var n_interviews = $(".interview").length;
alert(n_interviews);
for(var j=0; j<n_interviews;j++){
  var chosen_interview = $(".interview").eq(j);
  var n_paragraphs = chosen_interview.children("p").length;
  alert(n_paragraphs);
  var interviewer_initials = chosen_interview.attr("interviewer_initials");
  var interviewee_initials = chosen_interview.attr("interviewee_initials");
  for(var i=0; i<n_paragraphs; i++){
    if(i%2==0){
      chosen_interview.children("p").eq(i).prepend("<span class='initials'>"+interviewer_initials+": </span>");
    }else{
      chosen_interview.children("p").eq(i).prepend("<span class='initials'>"+interviewee_initials+": </span>");
    }
    // chosen_interview just alternates paragraph labeling, assuming the interviewer goes first... probably need a way to toggle chosen_interview. And make it smarter, if there are <p>s elsewhere in the page.
  }
}

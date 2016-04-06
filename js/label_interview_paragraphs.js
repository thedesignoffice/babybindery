
var n_paragraphs = $("p").length;
var interviewer_initials = $("#interviewer_initials").html();
var interviewee_initials = $("#interviewee_initials").html();
for(var i=0; i<n_paragraphs; i++){
  if(i%2==0){
    $("p").eq(i).prepend("<span class='interviewer initials'>"+interviewer_initials+": </span>");
  }else{
    $("p").eq(i).prepend("<span class='interviewee initials'>"+interviewee_initials+": </span>");
  }
// This just alternates paragraph labeling, assuming the interviewer goes first... probably need a way to toggle this. And make it smarter, if there are <p>s elsewhere in the page.
}

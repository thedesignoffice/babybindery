  alert('hey');

  var n_paragraphs = $("p").length;
  var interviewer_initials = $("h1 #interviewer_initials").attr("id");
  var interviewee_initials = $("h1 #interviewee_initials").attr("id");
  for(var i=0; i<n_paragraphs; i++){
    if(i%2==0){
      $("p").eq(i).prepend("<div class='interviewer initials'>"+interviewer_initials+": </div>");
    }else{
      $("p").eq(i).prepend("<div class='interviewee initials'>"+interviewee_initials+": </div>");
    }

  }

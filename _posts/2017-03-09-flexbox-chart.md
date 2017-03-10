---
layout: default
title: Flexbox bar chart
date: 2017-03-09
author: Dave Rupert
content-type: demo

---
<style>
.bar-chart {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
      -ms-flex-pack: justify;
          justify-content: space-between;
  -webkit-box-align: end;
      -ms-flex-align: end;
          align-items: flex-end;
  height: 10rem;
  background: #fff;
  margin-left: 1em;
  margin-right: 1em;
  position: relative;
}
.bar-chart:before, .bar-chart:after {
  position: absolute;
  left: -1.25em;
  font-size: 0.75em;
  color: #7a7a7a;
}
.bar-chart:before {
  content: attr(data-min);
  bottom: -0.5em;
}
.bar-chart:after {
  content: attr(data-max);
  top: -0.5em;
}

.col {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  background: #09f;
  color: #000;
  -webkit-box-align: end;
      -ms-flex-align: end;
          align-items: flex-end;
  -ms-flex-pack: distribute;
      justify-content: space-around;
}
.col:after {
  content: attr(data-label);
  position: absolute;
  bottom: -1.5em;
  font-size: 0.75em;
  color: #7a7a7a;
}

.col:not(:first-of-type) {
  margin-left: 1%;
}
</style>

<!-- The height formula here is: value/maxvalue * 100 -->
<div class="bar-chart" data-min="0" data-max="37" width="100%;">
<div class="col" style="height: 2.7%" data-value="1" data-label="2009"></div>
<div class="col" style="height: 13.51%" data-value="5" data-label="2010"></div>
<div class="col" style="height: 21.62%" data-value="8" data-label="2011"></div>
<div class="col" style="height: 16.21%" data-value="6" data-label="2012"></div>
<div class="col" style="height: 10.81%" data-value="4" data-label="2013"></div>
<div class="col" style="height: 29.72%" data-value="11" data-label="2014"></div>
<div class="col" style="height: 21.62%" data-value="8" data-label="2015"></div>
<div class="col" style="height: 100%" data-value="37" data-label="2016"></div>
</div>

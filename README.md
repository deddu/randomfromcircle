randomfromcircle
================
A web app that solves http://rubyquiz.strd6.com/quizzes/234-random-points-within-a-circle
in angular, bootstrap, and d3; 

### problem:
Generate random points uniformly distributed inside a circle of radius R around the point X0,Y0;

### solution:
think in radial coordinates, i.e. r,theta instead of x,y;
then theta, the angle, simple has to be a number within 0 and 2pi;
for a point to being inside the circle, the radial coordinate has simply to be < R. 
However, simply scaling the (0,1) interval within 0 and R, would distribut much more points close to the origin;
The argument is that we want to keep the area uniform, therefore we want to linearly scale take the sqrt of the interval.
i.e.: `r = R*sqrt(random())`

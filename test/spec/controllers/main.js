'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('circledistributionApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

    it ('generate 0,0 when requested for a point with radius 0', function(){
        var point=scope.get_points(1,0,0,0);
//        console.log(point.coords[0]);
        expect(point.coords[0].x).toBe(0);
        expect(point.coords[0].y).toBe(0);
    });

  it('generate 10 points  all inside the radius 1 when requested', function () {
    var points=scope.get_points(10,1,0,0);
    expect(points.xs.length).toBe(10);
    expect(points.ys.length).toBe(10);
    expect(points.coords.length).toBe(10);
      points.coords.forEach(function(p){
          //to be inside the conference of radius 1, x**2 +y**2 <1
          expect(Math.pow(p.x,2) + Math.pow(p.y,2)).toBeLessThan(1);
      });




  });
});

#!/usr/bin/env python
def random_inside_circle(radius, x0=0, y0=0):
    '''
    return a random point inside a circle of radius r around x0 y0:
    the problem is easily solved thinking in radial coordinates:
    we want a point with a random distance from the center, "r", and a random angle "t".
    Since the surface of a circle goes with the square power of the radius,
    and we want uniform coverage of such surface (i.e. uniformly distributed points) 
    the random radius values have to be sampled with square root weight.
    '''
    from random import random
    from math import sin, cos, sqrt, pi
    # the angle can be easily obtained by scaling the random interval (0,1)
    # between 0 and 2pi.
    t = 2 * pi * random()
    # and the radius, scaled by sqrt()
    r = radius * sqrt(random())
    # finally we return the projections on x and y axis, eventually translated
    # by x0,y0.
    return r * sin(t) + x0, r * cos(t) + y0

if __name__ == "__main__":
    from sys import argv
    import matplotlib.pyplot as plt
    # example: plot argv[2] points inside a circle of radius argv[1];
    points = [random_inside_circle(float(argv[1]))
              for i in range(int(argv[2]))]
    # plot wants two separate arrays...
    xs = [x[0] for x in points]
    ys = [y[1] for y in points]
    plt.plot(xs, ys, 'g.')
    plt.show()

Duct Tape
=========

    Point = require "point"

    Point::scale = (x, y) ->
      y ?= x

      Point(@x * x, @y * y)

    Point::abs = ->
      Point(Math.abs(@x), Math.abs(@y))

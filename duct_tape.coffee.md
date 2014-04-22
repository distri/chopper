Duct Tape
=========

    global.Observable = require "observable"
    Point = require "point"

    Point::scale = (width, height) ->
      if typeof width is "object"
        {width, height} = width

      height ?= width

      Point(@x * width, @y * height)

    Point::abs = ->
      Point(Math.abs(@x), Math.abs(@y))

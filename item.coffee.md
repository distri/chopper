Item Model
==========

    Composition = require "composition"
    Observable = require "observable"
    Point = require "point"
    Size = require "./lib/size"
    {extend, defaults} = require "util"

    module.exports = (I={}) ->
      defaults I,
        position: Point(0, 0)
        scale: Point(1, 1)
        rotation: 0
        size: Size(0, 0)

      self = Composition(I).extend
        copy: ->
          extend {}, I
        center: ->
          size = Point(1, 1).scale(self.size()).scale(0.5)

          self.position().add(size)

      self.attrObservable "position", "rotation", "scale", "size", "src"

      translation = ->
        {x, y} = self.position()

        "translate(#{x}px, #{y}px)"

      scale = ->
        {x, y} = self.scale()
        
        "scale(#{x},#{y})"

      if navigator.userAgent.match /WebKit/
        prefix = "-webkit-"
      else
        prefix = ""

      autosize = (src) ->
        img = document.createElement "img"
        img.onload = ->
          self.size Size @width, @height

        img.src = src

      # TODO: observe src changes
      autosize self.src()

      self.css = Observable ->
        "#{prefix}transform: #{translation()} #{scale()} rotate(#{self.rotation()}rad);"

      return self

Item Model
==========

    Composition = require "composition"
    Observable = require "observable"
    Point = require "point"
    {defaults} = require "util"

    module.exports = (I={}) ->
      defaults I,
        position: Point(0, 0)
        scale: Point(1, 1)
        rotation: 0
        width: 1
        height: 1

      self = Composition(I).extend
        center: ->
          size = Point(self.width(), self.height()).scale(0.5)

          self.position().add(size)

        scaledSize: ->
          self.scale().scale(self.width(), self.height())

      self.attrObservable "position", "rotation", "scale", "src"
      self.attrAccessor "width", "height"

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

      self.css = Observable ->
        "#{prefix}transform: #{translation()} #{scale()} rotate(#{self.rotation()}rad);"

      return self

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
          {x, y} = self.scale()
          size = Point(self.width() * x, self.height() * y).scale(0.5)
          self.position().add(size)

      self.attrObservable "position", "rotation", "scale", "src"
      self.attrAccessor "width", "height"

      translation = ->
        {x, y} = self.position()

        "translate(#{x}px, #{y}px)"

      scale = ->
        {x, y} = self.scale()
        
        "scale(#{x},#{y})"

      self.css = Observable ->
        "-webkit-transform: #{translation()} rotate(#{self.rotation()}rad) #{scale()};"

      return self

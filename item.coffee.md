Item Model
==========

    Composition = require "composition"
    Observable = require "observable"
    Point = require "point"
    Matrix = require "matrix"
    Size = require "./lib/size"
    {extend, defaults} = require "util"

    module.exports = (I={}) ->
      defaults I,
        transform: Matrix()
        size: Size(1, 1)

      self = Composition(I).extend
        position: ->
          self.transform().translationComponent()

        copy: ->
          extend {}, I

        center: ->
          size = Point(1, 1).scale(self.transform().scaleComponent().scale(0.5))

          self.position().add(size)

      self.attrObservable "transform", "size"

      autosize = (src) ->
        img = document.createElement "img"
        img.onload = ->
          self.size Size @width, @height

        img.src = src

      # TODO: observe src changes
      autosize self.src()

      self.css = Observable ->
        self.transform().css()

      return self

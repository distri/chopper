Item Model
==========

    Composition = require "composition"
    Observable = require "observable"
    {defaults} = require "util"

    module.exports = (I={}) ->
      defaults I,
        position: [0, 0]
        scale: [1, 1]
        rotation: 0

      self = Composition(I)

      self.attrObservable "position", "rotation", "scale", "src"

      translation = ->
        values = self.position().map (n) ->
          "#{n}px"
        .join(",")

        "translate(#{values})"

      self.css = Observable T ->
        "-webkit-transform: #{translation()} rotate(#{self.rotation()}rad) scale(#{self.scale().join(",")});"

      return self

Helpers
-------

    T = (output) ->
      (atom) ->
        r = output(atom)
        console.log r
        return r

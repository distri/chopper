Editor
======

    Item = require "./item"

    Composition = require "composition"

    Command = require "./command"

    module.exports = (I={}) ->
      self = Composition(I)

      self.include Command

      self.extend
        items: Observable []

        load: (data) ->
          self.items data.map Item

      return self

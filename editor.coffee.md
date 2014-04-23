Editor
======

    Item = require "./item"

    Composition = require "composition"

    Command = require "./command"
    Undo = require "undo"

    module.exports = (I={}) ->
      self = Composition(I)

      self.include Command, Undo

      self.extend
        items: Observable []

        load: (data) ->
          self.items data.map Item

        

      return self

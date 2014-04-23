    Command = require "./lib/command"

    module.exports = (I={}, self) ->
      self.include Command

      C = self.Command.register

      # TODO: Add, Delete, Raise, Lower

      C "Transform", (data) ->
        data.previous ?= self.items.get(data.index).transform()

        execute: ->
          self.items.get(data.index).transform data.transform

        undo: ->
          self.items.get(data.index).transform data.previous

        set: (transform) ->
          data.transform = transform
          @execute()

      C "Composite", (data) ->
        if data.commands
          # We came from JSON so rehydrate the commands.
          data.commands = data.commands.map self.Command.parse
        else
          data.commands = []

        commands = data.commands

        execute: ->
          commands.invoke "execute"

        undo: ->
          # Undo last command first because the order matters
          commands.copy().reverse().invoke "undo"

        push: (command, noExecute) ->
          # We execute commands immediately when pushed in the compound
          # so that the effects of events during mousemove appear
          # immediately but they are all revoked together on undo/redo
          # Passing noExecute as true will skip executing if we are
          # adding commands that have already executed.
          commands.push command
          command.execute() unless noExecute

        toJSON: ->
          extend {}, data,
            commands: commands.invoke "toJSON"

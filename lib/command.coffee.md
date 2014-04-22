Command
=======

    {extend} = require "util"

Commands that can be done/undone in the editor.

    module.exports = (I={}, self) ->
      self.Command =

Each command to inherits a toJSON method and registers itself to be 
de-serialized by name.

*IMPORTANT:* If the names change then old command data may fail to load in newer
versions.

        register: (name, constructor) ->
          self.Command[name] = (data={}) ->
            data = extend {}, data
            data.name = name
  
            command = constructor(data)
  
            command.toJSON ?= ->
              # TODO: May want to return a copy of the data to be super-duper safe
              data
  
            return command

        parse: (commandData) ->
          self.Command[commandData.name](commandData)

      return self

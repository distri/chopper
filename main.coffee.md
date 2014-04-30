Chopper
=======

Chop up images in the chop shop.

    window.focus()
    require "./duct_tape"

    Observable = require "observable"
    {applyStylesheet} = require "util"

    drop = require "./lib/drop"
    paste = require "./lib/paste"

    applyStylesheet require "./style"

    global.editor = require("./editor")()

    require("./state_loader")(editor)

    template = require "./templates/editor"
    document.body.appendChild template editor

    Dragzone = require "./dragzone"
    Dragzone($(".items"), editor)

    Item = require "./item"

    handler = (file) ->
      addImage URL.createObjectURL(file)

    drop document.querySelector("html"), handler

    paste document,
      callback: handler

    global.appData = ->
      JSON.stringify editor.items().map (item) ->
        item.toJSON()

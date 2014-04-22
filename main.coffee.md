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

    global.items = Observable []

    require "./state_loader"

    Dragzone = require "./lib/dragzone"

    Dragzone($("body"), items)

    template = require "./templates/view"
    document.body.appendChild template
      items: items

    helpTemplate = require "./templates/help"
    document.body.appendChild helpTemplate require "./hotkey_actions"

    Item = require "./item"

    handler = (file) ->
      addImage URL.createObjectURL(file)

    drop document.querySelector("html"), handler

    paste document,
      callback: handler

    global.appData = ->
      JSON.stringify items().map (item) ->
        item.toJSON()

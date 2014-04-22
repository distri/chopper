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

    S3Load = require "./s3load"
    S3Load("http://addressable.s3.amazonaws.com/?prefix=uploads")
    .then (data) ->
      data.map (datum) ->
        "http://addressable.s3.amazonaws.com/#{datum}"
      .map (src) ->
        items.push Item
          src: src

      console.log appData()

    global.appData = ->
      JSON.stringify items.map (item) ->
        item.I

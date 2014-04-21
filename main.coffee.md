Chopper
=======

Chop up images in the chop shop.

    require "./duct_tape"

    {applyStylesheet} = require "util"

    drop = require "./lib/drop"
    paste = require "./lib/paste"

    applyStylesheet require "./style"

    Dragzone = require "./lib/dragzone"

    Dragzone($("body"))
    
    Item = require "./item"

    handler = (file) ->
      addImage URL.createObjectURL(file)

    drop document.querySelector("html"), handler

    paste document,
      callback: handler

    S3Load = require "./s3load"
    S3Load("http://addressable.s3.amazonaws.com/?prefix=uploads")
    .then (items) ->
      items.map (item) ->
        "http://addressable.s3.amazonaws.com/#{item}"
      .map (src) ->
        add Item
          src: src

      console.log appData()

    addImage = (src) ->
      img = document.createElement "img"

      img.onload = ->
        delete this.onload

        this.data.width(this.width)
        this.data.height(this.height)

      img.src = src

      document.body.appendChild img

      return img

    global.items = []
    add = (item) ->
      view = addImage(item.src())
      view.data = item

      items.push item

      item.src.observe (src) ->
        view.src = src

      updateCss = (css) ->
        # console.log css
        view.style.cssText = css
      item.css.observe updateCss
      updateCss()

      return item

    global.appData = ->
      JSON.stringify items.map (item) ->
        item.I

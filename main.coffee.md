Chopper
=======

Chop up images in the chop shop.

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

    addImage = (src) ->
      img = document.createElement "img"

      img.onload = ->
        delete this.onload

        # $(this).css
        #   top: (document.body.clientHeight - this.height) / 2
        #   left: (document.body.clientWidth - this.width) / 2

      img.src = src

      document.body.appendChild img

      return img

    add = (item) ->
      view = addImage(item.src())
      view.data = item

      item.src.observe (src) ->
        view.src = src

      updateCss = (css) ->
        # console.log css
        view.style.cssText = css
      item.css.observe updateCss
      updateCss()

      return item
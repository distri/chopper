Chopper
=======

Chop up images in the chop shop.

    # require "jquery-utils"
    {applyStylesheet} = require "util"

    drop = require "./lib/drop"
    paste = require "./lib/paste"

    applyStylesheet require "./style"

    handler = (file) ->
      img = document.createElement "img"
      img.src = URL.createObjectURL(file)

      document.body.appendChild img

    drop document.querySelector("html"), handler

    paste document,
      callback: handler

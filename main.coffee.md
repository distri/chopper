Chopper
=======

Chop up images in the chop shop.

    {applyStylesheet} = require "util"

    drop = require "./lib/drop"
    paste = require "./lib/paste"

    applyStylesheet require "./style"

    Dragzone = require "./lib/dragzone"

    Dragzone($("body"))

    handler = (file) ->
      img = document.createElement "img"
      img.src = URL.createObjectURL(file)

      document.body.appendChild img

    drop document.querySelector("html"), handler

    $("body").on "move", "img", ({startX, startY, deltaX, deltaY}) ->
      $(this).css
        left: startX + deltaX
        top: startY + deltaY

    paste document,
      callback: handler

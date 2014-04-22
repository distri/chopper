Size
====

A simple 2d extent.

    Size = (width, height) ->
      if typeof width is "object"
        {width, height} = width

      width: width
      height: height
      __proto__: Size.prototype

    Size.prototype =
      scale: (scalar) ->
        Size(@width * scalar, @height * scalar)

      toString: ->
        "Size(#{@width}, #{@height})"

      max: (otherSize) ->
        Size(
          Math.max(@width, otherSize.width)
          Math.max(@height, otherSize.height)
        )

      each: (iterator) ->
        [0...@height].forEach (y) ->
          [0...@width].forEach (x) ->
            iterator(x, y)

    module.exports = Size

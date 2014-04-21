Highway through the Dragger Zone
================================

    module.exports = ($element) ->
      activeItem = null
      offset = null
      startPosition = null
      initialScale = null

      $element.bind
        "touchstart mousedown": (event) ->
          $target = $(target = event.target)
          if $target.is "img"
            event.preventDefault()

            activeItem = target.data

            if event.shiftKey
              initialScale = activeItem.scale()
            else
              initialScale = null

            startPosition = localPosition(event)
            itemStart = activeItem.position()

            offset = subtract itemStart, startPosition

          return

        "touchmove mousemove": (event) ->
          return unless activeItem
          p = localPosition(event)

          if initialScale
            delta = subtract p, startPosition
            deltaScale = scale add(delta, [100, 100]), 1/100
            activeItem.scale [deltaScale[0] * initialScale[0], deltaScale[1] * initialScale[1]]
          else
            activeItem.position add(p, offset)

        "touchend mouseup": (event) ->
          activeItem = null

          return

Helpers
-------

    localPosition = (event) ->
      [event.pageX, event.pageY]

    add = (a, b) ->
      [a[0] + b[0], a[1] + b[1]]

    subtract = (a, b) ->
      [a[0] - b[0], a[1] - b[1]]

    scale = (point, scalar) ->
      [point[0] * scalar, point[1] * scalar]

Highway through the Dragger Zone
================================

    Point = require "point"

    module.exports = ($element) ->
      activeItem = null
      offset = null
      startPosition = null
      initialRotation = null
      initialScale = null
      center = null

      $element.bind
        "touchstart mousedown": (event) ->
          $target = $(target = event.target)
          if $target.is "img"
            event.preventDefault()

            activeItem = target.data
            center = activeItem.center()

            initialScale = null
            initialRotation = null

            if event.shiftKey
              initialScale = activeItem.scale()
            else if event.ctrlKey or event.metaKey
              initialRotation = activeItem.rotation()

            startPosition = localPosition(event)
            itemStart = activeItem.position()

            offset = itemStart.subtract startPosition

          return

        "touchmove mousemove": (event) ->
          return unless activeItem
          p = localPosition(event)

          if initialScale
            # TODO Match actual item size rather than [100, 100]
            delta = p.subtract startPosition
            size = 100
            deltaScale = delta.add(Point(size, size)).scale 1/size
            activeItem.scale Point deltaScale.x * initialScale.x, deltaScale.y * initialScale.y
          else if initialRotation?
            vec = p.subtract center
            initialVec = startPosition.subtract center
            deltaRotation = Math.atan2(vec.y, vec.x) - Math.atan2(initialVec.y, initialVec.x)
            activeItem.rotation initialRotation + deltaRotation
          else
            activeItem.position p.add offset

        "touchend mouseup": (event) ->
          activeItem = null

          return

Helpers
-------

    localPosition = (event) ->
      Point event.pageX, event.pageY

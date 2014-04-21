Highway through the Dragger Zone
================================

    Point = require "point"

    debugPoint = document.createElement "div"
    debugPoint.className = "point"
    document.body.appendChild debugPoint


    module.exports = ($element, items) ->
      active = false
      activeItem = null
      activeView = null
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

            active = true
            activeView = target
            activeItem = items()[$(".items img").index(target)]
            center = activeItem.center()

            $(debugPoint).css
              top: center.y
              left: center.x

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
          return unless active
          p = localPosition(event)

          if initialScale
            initialVec = startPosition.subtract center
            currentVec = p.subtract center
            deltaScale = Point currentVec.x / initialVec.x, currentVec.y / initialVec.y

            activeItem.scale Point deltaScale.x * initialScale.x, deltaScale.y * initialScale.y
          else if initialRotation?
            vec = p.subtract center
            initialVec = startPosition.subtract center
            deltaRotation = Math.atan2(vec.y, vec.x) - Math.atan2(initialVec.y, initialVec.x)
            activeItem.rotation initialRotation + deltaRotation
          else
            activeItem.position p.add offset

        "touchend mouseup": (event) ->
          active = false

          return

Helpers
-------

    localPosition = (event) ->
      Point event.pageX, event.pageY

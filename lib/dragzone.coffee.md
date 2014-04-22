Highway through the Dragger Zone
================================

    Point = require "point"

    debugPoint = document.createElement "div"
    debugPoint.className = "point"
    document.body.appendChild debugPoint

    Actions = require "../hotkey_actions"

    module.exports = ($element, editor) ->
      active = false
      activeItem = null
      activeView = null
      offset = null
      startPosition = null
      initialTransform = null
      center = null

      Actions ->
        items: editor.items
        item: activeItem
        view: activeView

      $element.bind
        "touchstart mousedown": (event) ->
          $target = $(target = event.target)
          if $target.is "img"
            event.preventDefault()

            active = true
            activeView = target
            activeItem = editor.items.get $(".items img").index(target)
            center = activeItem.center()

            $(debugPoint).css
              top: center.y
              left: center.x

            initialTransform = activeItem.transform()

            scaling = false
            rotating = false

            if event.shiftKey
              scaling = true
            else if event.ctrlKey or event.metaKey
              rotating = true

            startPosition = localPosition(event)
            itemStart = activeItem.position()

            offset = itemStart.subtract startPosition

          return

        "touchmove mousemove": (event) ->
          return unless active
          p = localPosition(event)

          # TODO: Need to use more generalized transform concatenation to allow
          # scale and rotation to occur independently

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
            activeItem.transform initialTransform.concat(Matrix.translation(p.add offset))

        "touchend mouseup": (event) ->
          active = false

          return

Helpers
-------

    localPosition = (event) ->
      Point event.pageX, event.pageY

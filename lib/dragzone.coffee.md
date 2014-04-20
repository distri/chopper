Highway through the Dragger Zone
================================

    module.exports = ($element) ->
      activeItem = null
      offset = null

      $element.bind
        "touchstart mousedown": (event) ->          
          $target = $(event.target)
          if $target.is "img"
            event.preventDefault()
            activeItem = $target

            startPosition = localPosition(event)
            itemStart = $target.position()

            offset = subtract itemStart, startPosition

          return

        "touchmove mousemove": (event) ->
          return unless activeItem

          activeItem.css add(localPosition(event), offset)

        "touchend mouseup": (event) ->
          activeItem = null

          return


Helpers
-------

    localPosition = (event) ->
      top: event.pageY
      left: event.pageX

    add = (a, b) ->
      top: a.top + b.top
      left: a.left + b.left

    subtract = (a, b) ->
      top: a.top - b.top
      left: a.left - b.left

Hotkey Actions
==============

    require "jquery-hotkeys"

    Item = require "./item"
    Point = require "point"

    module.exports = (state) ->
      console.log "yolololo"
      Object.keys(bindings).forEach (hotkey) ->
        $(document).on "keydown", null, hotkey, ->
          console.log "dudereredre"
          actions[bindings[hotkey]](state())

    bindings =
      pageup: "raiseToTop"
      del: "delete"
      return: "duplicate"

    actions =
      raiseToTop: ({item, view, items}) ->
        items.push items.remove item
      delete: ({item, view, items}) ->
        items.remove item
      duplicate: ({item, view, items}) ->
        newItem = Item item.copy()
        newItem.position newItem.position().add(Point(20, 20))
        items.push newItem

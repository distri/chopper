Hotkey Actions
==============

    require "jquery-hotkeys"

    Item = require "./item"

    module.exports = (state) ->
      Object.keys(bindings).forEach (hotkey) ->
        $(document).on "keydown", null, hotkey, ->
          actions[bindings[hotkey]](state())

    bindings =
      pageup: "raiseToTop"
      delete: "delete"

    actions =
      raiseToTop: ({item, view, items}) ->
        items.push items.remove item
      delete: ({item, view, items}) ->
        items.remove item
      duplicate: ({item, view, items}) ->
        newItem = item.copy()
        newItem.position newItem.position().add(Point(20, 20))
        items.push newItem

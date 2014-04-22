Hotkey Actions
==============

    require "jquery-hotkeys"

    Item = require "./item"
    Point = require "point"

    module.exports = Actions = (state) ->
      Object.keys(bindings).forEach (hotkey) ->
        $(document).on "keydown", null, hotkey, (event) ->
          event.preventDefault()

          actions[bindings[hotkey]](state())

    Actions.hotkeys = ->
      objectToArray(bindings)

    bindings =
      f1: "displayHelp"
      pageup: "raiseToTop"
      del: "delete"
      return: "duplicate"
      "ctrl+s": "save"

    actions =
      displayHelp: ->
        $(".help").toggleClass("up")
      raiseToTop: ({item, view, items}) ->
        items.push items.remove item
      delete: ({item, view, items}) ->
        items.remove item
      duplicate: ({item, view, items}) ->
        newItem = Item item.copy()
        newItem.position newItem.position().add(Point(20, 20))
        items.push newItem

Saves to address bar for now.

      save: () ->
        data = appData()
        console.log data, data.length
        location.hash = data

Helpers
-------

    objectToArray = (object) ->
      Object.keys(object).map (key) ->
        [key, object[key]]

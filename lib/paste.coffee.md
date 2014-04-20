Paste File Reader
=================

    module.exports = (element, {matchType, callback}={}) ->
      matchType ?= /image.*/

      element.addEventListener 'paste', ({clipboardData}) ->
        found = false

        Array::forEach.call clipboardData.types, (type, i) ->
          return if found
  
          if type.match(matchType) or (clipboardData.items and clipboardData.items[i].type.match(matchType))
            file = clipboardData.items[i].getAsFile()
  
            callback(file)
  
            found = true

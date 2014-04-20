Drop Blobs
==========
  
    module.exports = (element, callback) ->
      w("dragenter dragover dragleave").forEach (name) ->
        element.addEventListener name, stopFn

      element.addEventListener 'drop', (event) ->
        console.log "dropping", event
        stopFn(event)

        Array::forEach.call event.dataTransfer.files, (file) ->
          callback(file)

Helpers
-------

    w = (string) ->
      string.split(/\s+/)

    stopFn = (event) ->
      event.stopPropagation()
      event.preventDefault()
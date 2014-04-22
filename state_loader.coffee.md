State Loader
============

    Item = require "./item"

First we get our state passed in from the ENV otherwise we use the location hash.

    global.ENV ?= {}

    ENV.APP_STATE ?= location.hash.substring(1)

    if data = ENV.APP_STATE
      items JSON.parse(data).map Item
    else
      

Otherwise we get one from S3

      S3Load = require "./s3load"
      S3Load("http://addressable.s3.amazonaws.com/?prefix=uploads")
      .then (data) ->
        data.map (datum) ->
          "http://addressable.s3.amazonaws.com/#{datum}"
        .map (src) ->
          items.push Item
            src: src
  
        console.log appData()

State Loader
============

First we get our state passed in from the ENV otherwise we use the location hash.

Otherwise we get one from S3

    module.exports = (editor) ->
      global.ENV ?= {}

      ENV.APP_STATE ?= location.hash.substring(1)

      if data = ENV.APP_STATE
        editor.load JSON.parse(data)
      else
        S3Load = require "./s3load"
        S3Load("http://addressable.s3.amazonaws.com/?prefix=uploads")
        .then (data) ->
          data.map (datum) ->
            "http://addressable.s3.amazonaws.com/#{datum}"
          .map (src) ->
            src: src
        .then (data) ->
          editor.load data

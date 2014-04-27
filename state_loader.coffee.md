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
        base = "http://trinket.s3.amazonaws.com/"
        S3Load = require "./s3load"
        S3Load("#{base}?prefix=18894/data")
        .then (data) ->
          data.map (datum) ->
            "#{base}#{datum}"
          .map (src) ->
            src: src
        .then (data) ->
          editor.load data

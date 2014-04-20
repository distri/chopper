List Bucket Contents from S3
============================

    module.exports = (url) ->
      $.get(url).then (data) ->
        $(data).find("Key").map ->
          this.innerHTML
        .get()

(function(pkg) {
  (function() {
  var annotateSourceURL, cacheFor, circularGuard, defaultEntryPoint, fileSeparator, generateRequireFn, global, isPackage, loadModule, loadPackage, loadPath, normalizePath, rootModule, startsWith,
    __slice = [].slice;

  fileSeparator = '/';

  global = window;

  defaultEntryPoint = "main";

  circularGuard = {};

  rootModule = {
    path: ""
  };

  loadPath = function(parentModule, pkg, path) {
    var cache, localPath, module, normalizedPath;
    if (startsWith(path, '/')) {
      localPath = [];
    } else {
      localPath = parentModule.path.split(fileSeparator);
    }
    normalizedPath = normalizePath(path, localPath);
    cache = cacheFor(pkg);
    if (module = cache[normalizedPath]) {
      if (module === circularGuard) {
        throw "Circular dependency detected when requiring " + normalizedPath;
      }
    } else {
      cache[normalizedPath] = circularGuard;
      try {
        cache[normalizedPath] = module = loadModule(pkg, normalizedPath);
      } finally {
        if (cache[normalizedPath] === circularGuard) {
          delete cache[normalizedPath];
        }
      }
    }
    return module.exports;
  };

  normalizePath = function(path, base) {
    var piece, result;
    if (base == null) {
      base = [];
    }
    base = base.concat(path.split(fileSeparator));
    result = [];
    while (base.length) {
      switch (piece = base.shift()) {
        case "..":
          result.pop();
          break;
        case "":
        case ".":
          break;
        default:
          result.push(piece);
      }
    }
    return result.join(fileSeparator);
  };

  loadPackage = function(pkg) {
    var path;
    path = pkg.entryPoint || defaultEntryPoint;
    return loadPath(rootModule, pkg, path);
  };

  loadModule = function(pkg, path) {
    var args, context, dirname, file, module, program, values;
    if (!(file = pkg.distribution[path])) {
      throw "Could not find file at " + path + " in " + pkg.name;
    }
    program = annotateSourceURL(file.content, pkg, path);
    dirname = path.split(fileSeparator).slice(0, -1).join(fileSeparator);
    module = {
      path: dirname,
      exports: {}
    };
    context = {
      require: generateRequireFn(pkg, module),
      global: global,
      module: module,
      exports: module.exports,
      PACKAGE: pkg,
      __filename: path,
      __dirname: dirname
    };
    args = Object.keys(context);
    values = args.map(function(name) {
      return context[name];
    });
    Function.apply(null, __slice.call(args).concat([program])).apply(module, values);
    return module;
  };

  isPackage = function(path) {
    if (!(startsWith(path, fileSeparator) || startsWith(path, "." + fileSeparator) || startsWith(path, ".." + fileSeparator))) {
      return path.split(fileSeparator)[0];
    } else {
      return false;
    }
  };

  generateRequireFn = function(pkg, module) {
    if (module == null) {
      module = rootModule;
    }
    if (pkg.name == null) {
      pkg.name = "ROOT";
    }
    if (pkg.scopedName == null) {
      pkg.scopedName = "ROOT";
    }
    return function(path) {
      var otherPackage;
      if (isPackage(path)) {
        if (!(otherPackage = pkg.dependencies[path])) {
          throw "Package: " + path + " not found.";
        }
        if (otherPackage.name == null) {
          otherPackage.name = path;
        }
        if (otherPackage.scopedName == null) {
          otherPackage.scopedName = "" + pkg.scopedName + ":" + path;
        }
        return loadPackage(otherPackage);
      } else {
        return loadPath(module, pkg, path);
      }
    };
  };

  if (typeof exports !== "undefined" && exports !== null) {
    exports.generateFor = generateRequireFn;
  } else {
    global.Require = {
      generateFor: generateRequireFn
    };
  }

  startsWith = function(string, prefix) {
    return string.lastIndexOf(prefix, 0) === 0;
  };

  cacheFor = function(pkg) {
    if (pkg.cache) {
      return pkg.cache;
    }
    Object.defineProperty(pkg, "cache", {
      value: {}
    });
    return pkg.cache;
  };

  annotateSourceURL = function(program, pkg, path) {
    return "" + program + "\n//# sourceURL=" + pkg.scopedName + "/" + path;
  };

}).call(this);

//# sourceURL=main.coffee
  window.require = Require.generateFor(pkg);
})({
  "source": {
    "LICENSE": {
      "path": "LICENSE",
      "content": "The MIT License (MIT)\n\nCopyright (c) 2014 \n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the \"Software\"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.",
      "mode": "100644",
      "type": "blob"
    },
    "README.md": {
      "path": "README.md",
      "content": "chopper\n=======\n\nTake images to the chop shop.\n",
      "mode": "100644",
      "type": "blob"
    },
    "main.coffee.md": {
      "path": "main.coffee.md",
      "content": "Chopper\n=======\n\nChop up images in the chop shop.\n\n    {applyStylesheet} = require \"util\"\n\n    drop = require \"./lib/drop\"\n    paste = require \"./lib/paste\"\n\n    applyStylesheet require \"./style\"\n\n    Dragzone = require \"./lib/dragzone\"\n\n    Dragzone($(\"body\"))\n\n    handler = (file) ->\n      img = document.createElement \"img\"\n      img.src = URL.createObjectURL(file)\n\n      document.body.appendChild img\n\n    drop document.querySelector(\"html\"), handler\n\n    $(\"body\").on \"move\", \"img\", ({startX, startY, deltaX, deltaY}) ->\n      $(this).css\n        left: startX + deltaX\n        top: startY + deltaY\n\n    paste document,\n      callback: handler\n",
      "mode": "100644"
    },
    "style.styl": {
      "path": "style.styl",
      "content": "html\n  height: 100%\n\nbody\n  height: 100%\n  margin: 0\n  position: relative\n  overflow: hidden\n\nimg\n  position: absolute\n",
      "mode": "100644"
    },
    "pixie.cson": {
      "path": "pixie.cson",
      "content": "version: \"0.1.0\"\nremoteDependencies: [\n  \"https://code.jquery.com/jquery-1.11.0.min.js\"\n]\ndependencies:\n  util: \"distri/util:v0.1.0\"\n",
      "mode": "100644"
    },
    "lib/drop.coffee.md": {
      "path": "lib/drop.coffee.md",
      "content": "Drop Blobs\n==========\n  \n    module.exports = (element, callback) ->\n      w(\"dragenter dragover dragleave\").forEach (name) ->\n        element.addEventListener name, stopFn\n\n      element.addEventListener 'drop', (event) ->\n        console.log \"dropping\", event\n        stopFn(event)\n\n        Array::forEach.call event.dataTransfer.files, (file) ->\n          callback(file)\n\nHelpers\n-------\n\n    w = (string) ->\n      string.split(/\\s+/)\n\n    stopFn = (event) ->\n      event.stopPropagation()\n      event.preventDefault()",
      "mode": "100644"
    },
    "lib/paste.coffee.md": {
      "path": "lib/paste.coffee.md",
      "content": "Paste File Reader\n=================\n\n    module.exports = (element, {matchType, callback}={}) ->\n      matchType ?= /image.*/\n\n      element.addEventListener 'paste', ({clipboardData}) ->\n        found = false\n\n        Array::forEach.call clipboardData.types, (type, i) ->\n          return if found\n  \n          if type.match(matchType) or (clipboardData.items and clipboardData.items[i].type.match(matchType))\n            file = clipboardData.items[i].getAsFile()\n  \n            callback(file)\n  \n            found = true\n",
      "mode": "100644"
    },
    "lib/dragzone.coffee.md": {
      "path": "lib/dragzone.coffee.md",
      "content": "Highway through the Dragger Zone\n================================\n\n    module.exports = ($element) ->\n      activeItem = null\n      offset = null\n\n      $element.bind\n        \"touchstart mousedown\": (event) ->          \n          $target = $(event.target)\n          if $target.is \"img\"\n            event.preventDefault()\n            activeItem = $target\n\n            startPosition = localPosition(event)\n            itemStart = $target.position()\n\n            offset = subtract itemStart, startPosition\n\n          return\n\n        \"touchmove mousemove\": (event) ->\n          return unless activeItem\n\n          activeItem.css add(localPosition(event), offset)\n\n        \"touchend mouseup\": (event) ->\n          activeItem = null\n\n          return\n\n\nHelpers\n-------\n\n    localPosition = (event) ->\n      top: event.pageY\n      left: event.pageX\n\n    add = (a, b) ->\n      top: a.top + b.top\n      left: a.left + b.left\n\n    subtract = (a, b) ->\n      top: a.top - b.top\n      left: a.left - b.left\n",
      "mode": "100644"
    }
  },
  "distribution": {
    "main": {
      "path": "main",
      "content": "(function() {\n  var Dragzone, applyStylesheet, drop, handler, paste;\n\n  applyStylesheet = require(\"util\").applyStylesheet;\n\n  drop = require(\"./lib/drop\");\n\n  paste = require(\"./lib/paste\");\n\n  applyStylesheet(require(\"./style\"));\n\n  Dragzone = require(\"./lib/dragzone\");\n\n  Dragzone($(\"body\"));\n\n  handler = function(file) {\n    var img;\n    img = document.createElement(\"img\");\n    img.src = URL.createObjectURL(file);\n    return document.body.appendChild(img);\n  };\n\n  drop(document.querySelector(\"html\"), handler);\n\n  $(\"body\").on(\"move\", \"img\", function(_arg) {\n    var deltaX, deltaY, startX, startY;\n    startX = _arg.startX, startY = _arg.startY, deltaX = _arg.deltaX, deltaY = _arg.deltaY;\n    return $(this).css({\n      left: startX + deltaX,\n      top: startY + deltaY\n    });\n  });\n\n  paste(document, {\n    callback: handler\n  });\n\n}).call(this);\n",
      "type": "blob"
    },
    "style": {
      "path": "style",
      "content": "module.exports = \"html {\\n  height: 100%;\\n}\\n\\nbody {\\n  height: 100%;\\n  margin: 0;\\n  position: relative;\\n  overflow: hidden;\\n}\\n\\nimg {\\n  position: absolute;\\n}\";",
      "type": "blob"
    },
    "pixie": {
      "path": "pixie",
      "content": "module.exports = {\"version\":\"0.1.0\",\"remoteDependencies\":[\"https://code.jquery.com/jquery-1.11.0.min.js\"],\"dependencies\":{\"util\":\"distri/util:v0.1.0\"}};",
      "type": "blob"
    },
    "lib/drop": {
      "path": "lib/drop",
      "content": "(function() {\n  var stopFn, w;\n\n  module.exports = function(element, callback) {\n    w(\"dragenter dragover dragleave\").forEach(function(name) {\n      return element.addEventListener(name, stopFn);\n    });\n    return element.addEventListener('drop', function(event) {\n      console.log(\"dropping\", event);\n      stopFn(event);\n      return Array.prototype.forEach.call(event.dataTransfer.files, function(file) {\n        return callback(file);\n      });\n    });\n  };\n\n  w = function(string) {\n    return string.split(/\\s+/);\n  };\n\n  stopFn = function(event) {\n    event.stopPropagation();\n    return event.preventDefault();\n  };\n\n}).call(this);\n",
      "type": "blob"
    },
    "lib/paste": {
      "path": "lib/paste",
      "content": "(function() {\n  module.exports = function(element, _arg) {\n    var callback, matchType, _ref;\n    _ref = _arg != null ? _arg : {}, matchType = _ref.matchType, callback = _ref.callback;\n    if (matchType == null) {\n      matchType = /image.*/;\n    }\n    return element.addEventListener('paste', function(_arg1) {\n      var clipboardData, found;\n      clipboardData = _arg1.clipboardData;\n      found = false;\n      return Array.prototype.forEach.call(clipboardData.types, function(type, i) {\n        var file;\n        if (found) {\n          return;\n        }\n        if (type.match(matchType) || (clipboardData.items && clipboardData.items[i].type.match(matchType))) {\n          file = clipboardData.items[i].getAsFile();\n          callback(file);\n          return found = true;\n        }\n      });\n    });\n  };\n\n}).call(this);\n",
      "type": "blob"
    },
    "lib/dragzone": {
      "path": "lib/dragzone",
      "content": "(function() {\n  var add, localPosition, subtract;\n\n  module.exports = function($element) {\n    var activeItem, offset;\n    activeItem = null;\n    offset = null;\n    return $element.bind({\n      \"touchstart mousedown\": function(event) {\n        var $target, itemStart, startPosition;\n        $target = $(event.target);\n        if ($target.is(\"img\")) {\n          event.preventDefault();\n          activeItem = $target;\n          startPosition = localPosition(event);\n          itemStart = $target.position();\n          offset = subtract(itemStart, startPosition);\n        }\n      },\n      \"touchmove mousemove\": function(event) {\n        if (!activeItem) {\n          return;\n        }\n        return activeItem.css(add(localPosition(event), offset));\n      },\n      \"touchend mouseup\": function(event) {\n        activeItem = null;\n      }\n    });\n  };\n\n  localPosition = function(event) {\n    return {\n      top: event.pageY,\n      left: event.pageX\n    };\n  };\n\n  add = function(a, b) {\n    return {\n      top: a.top + b.top,\n      left: a.left + b.left\n    };\n  };\n\n  subtract = function(a, b) {\n    return {\n      top: a.top - b.top,\n      left: a.left - b.left\n    };\n  };\n\n}).call(this);\n",
      "type": "blob"
    }
  },
  "progenitor": {
    "url": "http://www.danielx.net/editor/"
  },
  "version": "0.1.0",
  "entryPoint": "main",
  "remoteDependencies": [
    "https://code.jquery.com/jquery-1.11.0.min.js"
  ],
  "repository": {
    "branch": "master",
    "default_branch": "master",
    "full_name": "distri/chopper",
    "homepage": null,
    "description": "Take images to the chop shop.",
    "html_url": "https://github.com/distri/chopper",
    "url": "https://api.github.com/repos/distri/chopper",
    "publishBranch": "gh-pages"
  },
  "dependencies": {
    "util": {
      "source": {
        "LICENSE": {
          "path": "LICENSE",
          "mode": "100644",
          "content": "The MIT License (MIT)\n\nCopyright (c) 2014 \n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the \"Software\"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.",
          "type": "blob"
        },
        "README.md": {
          "path": "README.md",
          "mode": "100644",
          "content": "util\n====\n\nSmall utility methods for JS\n",
          "type": "blob"
        },
        "main.coffee.md": {
          "path": "main.coffee.md",
          "mode": "100644",
          "content": "Util\n====\n\n    module.exports =\n      approach: (current, target, amount) ->\n        (target - current).clamp(-amount, amount) + current\n\nApply a stylesheet idempotently.\n\n      applyStylesheet: (style, id=\"primary\") ->\n        styleNode = document.createElement(\"style\")\n        styleNode.innerHTML = style\n        styleNode.id = id\n\n        if previousStyleNode = document.head.querySelector(\"style##{id}\")\n          previousStyleNode.parentNode.removeChild(prevousStyleNode)\n\n        document.head.appendChild(styleNode)\n\n      defaults: (target, objects...) ->\n        for object in objects\n          for name of object\n            unless target.hasOwnProperty(name)\n              target[name] = object[name]\n\n        return target\n\n      extend: (target, sources...) ->\n        for source in sources\n          for name of source\n            target[name] = source[name]\n\n        return target\n",
          "type": "blob"
        },
        "pixie.cson": {
          "path": "pixie.cson",
          "mode": "100644",
          "content": "version: \"0.1.0\"\n",
          "type": "blob"
        }
      },
      "distribution": {
        "main": {
          "path": "main",
          "content": "(function() {\n  var __slice = [].slice;\n\n  module.exports = {\n    approach: function(current, target, amount) {\n      return (target - current).clamp(-amount, amount) + current;\n    },\n    applyStylesheet: function(style, id) {\n      var previousStyleNode, styleNode;\n      if (id == null) {\n        id = \"primary\";\n      }\n      styleNode = document.createElement(\"style\");\n      styleNode.innerHTML = style;\n      styleNode.id = id;\n      if (previousStyleNode = document.head.querySelector(\"style#\" + id)) {\n        previousStyleNode.parentNode.removeChild(prevousStyleNode);\n      }\n      return document.head.appendChild(styleNode);\n    },\n    defaults: function() {\n      var name, object, objects, target, _i, _len;\n      target = arguments[0], objects = 2 <= arguments.length ? __slice.call(arguments, 1) : [];\n      for (_i = 0, _len = objects.length; _i < _len; _i++) {\n        object = objects[_i];\n        for (name in object) {\n          if (!target.hasOwnProperty(name)) {\n            target[name] = object[name];\n          }\n        }\n      }\n      return target;\n    },\n    extend: function() {\n      var name, source, sources, target, _i, _len;\n      target = arguments[0], sources = 2 <= arguments.length ? __slice.call(arguments, 1) : [];\n      for (_i = 0, _len = sources.length; _i < _len; _i++) {\n        source = sources[_i];\n        for (name in source) {\n          target[name] = source[name];\n        }\n      }\n      return target;\n    }\n  };\n\n}).call(this);\n",
          "type": "blob"
        },
        "pixie": {
          "path": "pixie",
          "content": "module.exports = {\"version\":\"0.1.0\"};",
          "type": "blob"
        }
      },
      "progenitor": {
        "url": "http://strd6.github.io/editor/"
      },
      "version": "0.1.0",
      "entryPoint": "main",
      "repository": {
        "id": 18501018,
        "name": "util",
        "full_name": "distri/util",
        "owner": {
          "login": "distri",
          "id": 6005125,
          "avatar_url": "https://avatars.githubusercontent.com/u/6005125?",
          "gravatar_id": "192f3f168409e79c42107f081139d9f3",
          "url": "https://api.github.com/users/distri",
          "html_url": "https://github.com/distri",
          "followers_url": "https://api.github.com/users/distri/followers",
          "following_url": "https://api.github.com/users/distri/following{/other_user}",
          "gists_url": "https://api.github.com/users/distri/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/distri/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/distri/subscriptions",
          "organizations_url": "https://api.github.com/users/distri/orgs",
          "repos_url": "https://api.github.com/users/distri/repos",
          "events_url": "https://api.github.com/users/distri/events{/privacy}",
          "received_events_url": "https://api.github.com/users/distri/received_events",
          "type": "Organization",
          "site_admin": false
        },
        "private": false,
        "html_url": "https://github.com/distri/util",
        "description": "Small utility methods for JS",
        "fork": false,
        "url": "https://api.github.com/repos/distri/util",
        "forks_url": "https://api.github.com/repos/distri/util/forks",
        "keys_url": "https://api.github.com/repos/distri/util/keys{/key_id}",
        "collaborators_url": "https://api.github.com/repos/distri/util/collaborators{/collaborator}",
        "teams_url": "https://api.github.com/repos/distri/util/teams",
        "hooks_url": "https://api.github.com/repos/distri/util/hooks",
        "issue_events_url": "https://api.github.com/repos/distri/util/issues/events{/number}",
        "events_url": "https://api.github.com/repos/distri/util/events",
        "assignees_url": "https://api.github.com/repos/distri/util/assignees{/user}",
        "branches_url": "https://api.github.com/repos/distri/util/branches{/branch}",
        "tags_url": "https://api.github.com/repos/distri/util/tags",
        "blobs_url": "https://api.github.com/repos/distri/util/git/blobs{/sha}",
        "git_tags_url": "https://api.github.com/repos/distri/util/git/tags{/sha}",
        "git_refs_url": "https://api.github.com/repos/distri/util/git/refs{/sha}",
        "trees_url": "https://api.github.com/repos/distri/util/git/trees{/sha}",
        "statuses_url": "https://api.github.com/repos/distri/util/statuses/{sha}",
        "languages_url": "https://api.github.com/repos/distri/util/languages",
        "stargazers_url": "https://api.github.com/repos/distri/util/stargazers",
        "contributors_url": "https://api.github.com/repos/distri/util/contributors",
        "subscribers_url": "https://api.github.com/repos/distri/util/subscribers",
        "subscription_url": "https://api.github.com/repos/distri/util/subscription",
        "commits_url": "https://api.github.com/repos/distri/util/commits{/sha}",
        "git_commits_url": "https://api.github.com/repos/distri/util/git/commits{/sha}",
        "comments_url": "https://api.github.com/repos/distri/util/comments{/number}",
        "issue_comment_url": "https://api.github.com/repos/distri/util/issues/comments/{number}",
        "contents_url": "https://api.github.com/repos/distri/util/contents/{+path}",
        "compare_url": "https://api.github.com/repos/distri/util/compare/{base}...{head}",
        "merges_url": "https://api.github.com/repos/distri/util/merges",
        "archive_url": "https://api.github.com/repos/distri/util/{archive_format}{/ref}",
        "downloads_url": "https://api.github.com/repos/distri/util/downloads",
        "issues_url": "https://api.github.com/repos/distri/util/issues{/number}",
        "pulls_url": "https://api.github.com/repos/distri/util/pulls{/number}",
        "milestones_url": "https://api.github.com/repos/distri/util/milestones{/number}",
        "notifications_url": "https://api.github.com/repos/distri/util/notifications{?since,all,participating}",
        "labels_url": "https://api.github.com/repos/distri/util/labels{/name}",
        "releases_url": "https://api.github.com/repos/distri/util/releases{/id}",
        "created_at": "2014-04-06T22:42:56Z",
        "updated_at": "2014-04-06T22:42:56Z",
        "pushed_at": "2014-04-06T22:42:56Z",
        "git_url": "git://github.com/distri/util.git",
        "ssh_url": "git@github.com:distri/util.git",
        "clone_url": "https://github.com/distri/util.git",
        "svn_url": "https://github.com/distri/util",
        "homepage": null,
        "size": 0,
        "stargazers_count": 0,
        "watchers_count": 0,
        "language": null,
        "has_issues": true,
        "has_downloads": true,
        "has_wiki": true,
        "forks_count": 0,
        "mirror_url": null,
        "open_issues_count": 0,
        "forks": 0,
        "open_issues": 0,
        "watchers": 0,
        "default_branch": "master",
        "master_branch": "master",
        "permissions": {
          "admin": true,
          "push": true,
          "pull": true
        },
        "organization": {
          "login": "distri",
          "id": 6005125,
          "avatar_url": "https://avatars.githubusercontent.com/u/6005125?",
          "gravatar_id": "192f3f168409e79c42107f081139d9f3",
          "url": "https://api.github.com/users/distri",
          "html_url": "https://github.com/distri",
          "followers_url": "https://api.github.com/users/distri/followers",
          "following_url": "https://api.github.com/users/distri/following{/other_user}",
          "gists_url": "https://api.github.com/users/distri/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/distri/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/distri/subscriptions",
          "organizations_url": "https://api.github.com/users/distri/orgs",
          "repos_url": "https://api.github.com/users/distri/repos",
          "events_url": "https://api.github.com/users/distri/events{/privacy}",
          "received_events_url": "https://api.github.com/users/distri/received_events",
          "type": "Organization",
          "site_admin": false
        },
        "network_count": 0,
        "subscribers_count": 2,
        "branch": "v0.1.0",
        "publishBranch": "gh-pages"
      },
      "dependencies": {}
    }
  }
});
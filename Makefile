NODE_CMD = node -e "var mustache = require('mustache'), fs = require('fs'), scriptTemplate = fs.readFileSync('js/scripts.template', 'utf8'); var view = {AddGame: fs.readFileSync('js/addGame.js', 'utf8'), ApiHelper: fs.readFileSync('js/apiHelper.js', 'utf8'), Bind: fs.readFileSync('js/bind.js', 'utf8'), GameController: fs.readFileSync('js/gameController.js', 'utf8') }; fs.writeFileSync('js/scripts.js', mustache.render(scriptTemplate, view));"

setup:
	@echo "Installing modules..."
	@npm install -g bower
	@npm install -g jshint
	@npm install mustache
	@npm install node-minify
	@npm intall watchr

debug:
	@rm -f js/scripts.js
	@jshint js/*.js
	@$(NODE_CMD)

build:
	@rm -f js/scripts.js
	@jshint js/*.js
	@$(NODE_CMD)
	@node -e "var compressor = require('node-minify'); new compressor.minify({ type: 'gcc', fileIn: 'js/scripts.js', fileOut: 'js/scripts.min.js', callback: function(err){console.log(err);}});"
	@rm -f js/scripts.js
	@mv js/scripts.min.js js/scripts.js

clean:
	@rm -f js/scripts.js

#for development to update scripts.js everytime a file changes
watch:
	@node -e "var watchr = require('watchr'), exec = require('child_process').exec; watchr.watch({ path: 'js/', listener: function() { exec('make debug'); console.log('rebuilding...'); }, next: function(err, watcher) { if (err) throw err; console.log('watching setup successful'); }});"

.PHONY: setup debug build clean watch

<!doctype html>
<html>
  <head>
		<meta charset="utf-8">
		<title>Autocomplete Demo</title>
		<link rel="stylesheet" href="../lib/codemirror.css">
		<script src="../lib/codemirror.js"></script>

		<!-- theme css begin -->
		<link rel="stylesheet" href="../theme/neat.css">
		<link rel="stylesheet" href="../theme/elegant.css">
		<link rel="stylesheet" href="../theme/erlang-dark.css">
		<link rel="stylesheet" href="../theme/night.css">
		<link rel="stylesheet" href="../theme/monokai.css">
		<link rel="stylesheet" href="../theme/cobalt.css">
		<link rel="stylesheet" href="../theme/eclipse.css">
		<link rel="stylesheet" href="../theme/rubyblue.css">
		<link rel="stylesheet" href="../theme/lesser-dark.css">
		<link rel="stylesheet" href="../theme/xq-dark.css">
		<link rel="stylesheet" href="../theme/xq-light.css">
		<link rel="stylesheet" href="../theme/ambiance.css">
		<link rel="stylesheet" href="../theme/blackboard.css">
		<link rel="stylesheet" href="../theme/vibrant-ink.css">
		<link rel="stylesheet" href="../theme/solarized.css">
		<link rel="stylesheet" href="../theme/twilight.css">
		<link rel="stylesheet" href="../theme/midnight.css">
		<!-- theme css end -->

		<!-- include hint lib -->
		<script src="../addon/hint/show-hint.js"></script>
		<link rel="stylesheet" href="../addon/hint/show-hint.css">

		<!-- define code format -->
		<script src="../mode/javascript/javascript.js"></script>

		<!-- dsplay icons-->
		<script src="http://ajax.aspnetcdn.com/ajax/jshint/r07/jshint.js"></script>
		<script src="https://raw.github.com/zaach/jsonlint/79b553fb65c192add9066da64043458981b3972b/lib/jsonlint.js"></script>
		<link rel="stylesheet" href="../doc/docs.css">
		<link rel="stylesheet" href="../addon/lint/lint.css">
		<script src="../addon/lint/lint.js"></script>
		<script src="../addon/lint/javascript-lint.js"></script>
		<script src="../addon/lint/json-lint.js"></script>

		<!-- include hint source -->
		<script src="../addon/hint/javascript-hint.js"></script>

		<!-- highlight current line (with below inline css code) -->
		<script src="../addon/selection/active-line.js"></script>

		<!-- highlight selected text (with below inline css code) -->
		<script src="../addon/search/match-highlighter.js"></script>
		
		<!-- lazy load mode support 
		<script src="../addon/mode/loadmode.js"></script>
		-->


		<style type="text/css">
			.CodeMirror {
				border-top: 1px solid black;
				border-bottom: 1px solid black;
			}
			.CodeMirror-activeline-background {
				background: #e8f2ff !important;
			}

			/* hightlight matched text*/
			.CodeMirror-focused .cm-matchhighlight {
				background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAFklEQVQI12NgYGBgkKzc8x9CMDAwAAAmhwSbidEoSQAAAABJRU5ErkJggg==);
				background-position: bottom;
				background-repeat: repeat-x;
				background-color: lightgreen;
			}
		</style>
	</head>
	<body>
		<h1>Autocomplete Demo</h1>

		<form>
			<textarea id="code-js">var widgets = []
function updateHints() {
  editor.operation(function(){
    for (var i = 0; i < widgets.length; ++i)
      editor.removeLineWidget(widgets[i]);
    widgets.length = 0;

    JSHINT(editor.getValue());
    for (var i = 0; i < JSHINT.errors.length; ++i) {
      var err = JSHINT.errors[i];
      if (!err) continue;
      var msg = document.createElement("div");
      var icon = msg.appendChild(document.createElement("span"));
      icon.innerHTML = "!!";
      icon.className = "lint-error-icon";
      msg.appendChild(document.createTextNode(err.reason));
      msg.className = "lint-error";
      widgets.push(editor.addLineWidget(err.line - 1, msg, {coverGutter: false, noHScroll: true}));
    }
  });
  var info = editor.getScrollInfo();
  var after = editor.charCoords({line: editor.getCursor().line + 1, ch: 0}, "local").top;
  if (info.top + info.clientHeight < after)
    editor.scrollTo(null, after - info.clientHeight + 3);
}
			</textarea>
		</form>
		<p>
			Select a theme:
			<select onchange="selectTheme()" id=select>
				<option selected>default</option>
				<option>ambiance</option>
				<option>blackboard</option>
				<option>cobalt</option>
				<option>eclipse</option>
				<option>elegant</option>
				<option>erlang-dark</option>
				<option>lesser-dark</option>
				<option>midnight</option>
				<option>monokai</option>
				<option>neat</option>
				<option>night</option>
				<option>rubyblue</option>
				<option>solarized dark</option>
				<option>solarized light</option>
				<option>twilight</option>
				<option>vibrant-ink</option>
				<option>xq-dark</option>
				<option>xq-light</option>
			</select>
		</p>
		<p>
			<input type=text value=javascript id=mode>
			<button type=button onclick="change()">change mode</button>
		</p>


		<script>
			//full screen support
			function isFullScreen(cm) {
				return /\bCodeMirror-fullscreen\b/.test(cm.getWrapperElement().className);
			}

			function winHeight() {
				return window.innerHeight || (document.documentElement || document.body).clientHeight;
			}

			function setFullScreen(cm, full) {
				var wrap = cm.getWrapperElement();
				if (full) {
					wrap.className += " CodeMirror-fullscreen";
					wrap.style.height = winHeight() + "px";
					document.documentElement.style.overflow = "hidden";
				} else {
					wrap.className = wrap.className.replace(" CodeMirror-fullscreen", "");
					wrap.style.height = "";
					document.documentElement.style.overflow = "";
				}
				cm.refresh();
			}
			
			CodeMirror.on(window, "resize", function() {
				var showing = document.body.getElementsByClassName("CodeMirror-fullscreen")[0];
				if (!showing)
					return;
				showing.CodeMirror.getWrapperElement().style.height = winHeight() + "px";
			});


			//lazy load mode support
/*			CodeMirror.modeURL = "../mode/%N/%N.js";
			var modeInput = document.getElementById("mode");
			CodeMirror.on(modeInput, "keypress", function(e) {
				if (e.keyCode == 13) change();
			});
			function change() {
				editor.setOption("mode", modeInput.value);
				CodeMirror.autoLoadMode(editor, modeInput.value);
			}
*/

			//auto complete support
			CodeMirror.commands.autocomplete = function(cm) {
				CodeMirror.showHint(cm, CodeMirror.javascriptHint);
			}
			
			
			
			//new a textarea
			var editor = CodeMirror.fromTextArea(document.getElementById("code-js"), {
				lineNumbers : true,
				mode : "javascript",
				styleActiveLine : true,
				highlightSelectionMatches : true,
				gutters : ["CodeMirror-lint-markers"],
				lintWith : CodeMirror.javascriptValidator,
				/*
				keyMap: {

				Space: function(cm) {
				console.log(cm);
				//alert("asasas/...");
				},

				Tab: function(cm) {
				var spaces = Array(cm.getOption("indentUnit") + 1).join(" ");
				cm.replaceSelection(spaces, "end", "+input");

				}

				},
				*/
				//extraKeys: {"Alt-/": "autocomplete"}
				extraKeys : {
					"Alt-/" : "autocomplete",
					"F11" : function(cm) {
						setFullScreen(cm, !isFullScreen(cm));
					},
					"Esc" : function(cm) {
						if (isFullScreen(cm))
							setFullScreen(cm, false);
					}
				}
			});



			//theme support
			var input = document.getElementById("select");
			function selectTheme() {
				var theme = input.options[input.selectedIndex].innerHTML;
				editor.setOption("theme", theme);
			}

			var choice = document.location.search && decodeURIComponent(document.location.search.slice(1));
			if (choice) {
				input.value = choice;
				editor.setOption("theme", choice);
			}



			/*
			 var editor_json = CodeMirror.fromTextArea(document.getElementById("code-json"), {
			 lineNumbers: true,
			 mode: "application/json",
			 gutters: ["CodeMirror-lint-markers"],
			 lintWith: CodeMirror.jsonValidator
			 });
			 */

		</script>

	</body>
</html>

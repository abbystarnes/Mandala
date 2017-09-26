<div class="header-one z-depth-1">
<h1>mandala</h1>
</div>

	<div class="svg-container">
	<?xml version="1.0" encoding="utf-8"?>
	<svg version="1.1" id="active_svg" class="active_svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
		 viewBox="0 0 424 644" style="enable-background:new 0 0 424 644;" xml:space="preserve">
	</svg>
	</div>
	  <input id='colorpicker' />
	<div id="slide-out" class="side-nav">
		<ul>
			<li ng-repeat="template in $ctrl.templates">
			<a class="mandala-link" ng-click="$ctrl.selectMandala(template.id, template.file_path)"><svg version="1.1" class="thumbnail" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
				 viewBox="0 0 424 644" style="enable-background:new 0 0 424 644;" xml:space="preserve">
			</svg></a>
			</li>
		</ul>
		<i href="#" class="button-collapse medium material-icons" data-activates="slide-out" data-sidenav="left" data-menuwidth="500" data-closeonclick="false">play_arrow</i>
	</div>


	<i ng-click="$ctrl.undo()" class="undo material-icons medium">undo</i>
	<button ng-click="$ctrl.clear()" class=" clear btn blue-grey darken-4">clear</button>

	<i class="share-btn material-icons" ng-click="showPublish()">publish</i>
	<i class="collaborate-btn material-icons" ng-click="showCollaborate()">people</i>

<div id="publish" class="publish mandala-modal z-depth-1">
	<i class="material-icons mandala-modal-x">cancel</i>
	<div class="publish-content">
		<h4>publish modal</h4>
		<p>A bunch of text</p>
	</div>
</div>

<div id="collaborate" class="collaborate mandala-modal z-depth-1">
	<i class="material-icons mandala-modal-x">cancel</i>
	<div class="publish-content">
		<h4>collaborate modal</h4>
		<p>A bunch of text</p>
	</div>
</div>

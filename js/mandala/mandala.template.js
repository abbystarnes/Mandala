<div class="svg-container">
<?xml version="1.0" encoding="utf-8"?>
<svg version="1.1" id="svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 424 644" style="enable-background:new 0 0 424 644;" xml:space="preserve">
</svg>
</div>
<button id="undo_btn" ng-click="$ctrl.undo()">undo</button>
<button id="save_btn" ng-click="$ctrl.save()">save</button>
<div id="slide-out" class="side-nav">
	<ul>
		<li ng-repeat="template in $ctrl.templates">
		<svg version="1.1" class="thumbnail" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
			 viewBox="0 0 424 644" style="enable-background:new 0 0 424 644;" xml:space="preserve">
		</svg></li>
	</ul>
</div>
<a href="#" class="button-collapse" data-activates="slide-out" data-sidenav="left" data-menuwidth="500" data-closeonclick="false">
    Show side-nav
</a>

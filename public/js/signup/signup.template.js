<div class="header-one">
<h1>mandala</h1>
</div>
<div class="header-two">
<h2>register</h2>
</div>

<div class="form-holder">

<form name="$ctrl.newUserForm" novalidate ng-submit="$ctrl.createNewUserForm()">

<div class="field" ng-class="$ctrl.isValid('$ctrl.user.user_name')">
<label for="user_name">Name</label>
<input ng-model='$ctrl.user.user_name' name="user_name" id="user_name" class="form-control" required>
<span ng-if="$ctrl.isValid('$ctrl.user.user_name')" class="help-block">Required Field</span>
</div>

<div  class="field" ng-class="$ctrl.isValid('$ctrl.user.email')">
<label for="email">Email</label>
<input ng-model='$ctrl.user.email' name="email" id="email" class="form-control" required>
<span ng-if="$ctrl.isValid('$ctrl.user.email')" class="help-block">Required Field</span>
</div>

<div  class="field" ng-class="$ctrl.isValid('$ctrl.user.hashed_pwd')">
<label for="hashed_pwd">Password</label>
<input ng-model='$ctrl.user.hashed_pwd' name="hashed_pwd" id="hashed_pwd" class="form-control" required>
<span ng-if="$ctrl.isValid('$ctrl.user.hashed_pwd')" class="help-block">Required Field</span>
</div>

<div  class="field" class="form-group">
  <button class="waves-effect waves-light btn blue-grey" ng-class="$ctrl.isDisabled()" ng-disabled="$ctrl.isDisabled()" type="submit" class="btn btn-primary">
    register
</button>
</div>
</form>
</div>

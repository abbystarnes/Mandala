<h2>sign up</h2>
<form name="$ctrl.newUserForm" novalidate ng-submit="$ctrl.createNewUserForm()">

<div ng-class="$ctrl.isValid('$ctrl.user.user_name')">
<label for="user_name">Name</label>
<input ng-model='$ctrl.user.user_name' name="user_name" id="user_name" class="form-control" required>
<span ng-if="$ctrl.isValid('$ctrl.user.user_name')" class="help-block">Required Field</span>
</div>

<div ng-class="$ctrl.isValid('$ctrl.user.email')">
<label for="email">Email</label>
<input ng-model='$ctrl.user.email' name="email" id="email" class="form-control" required>
<span ng-if="$ctrl.isValid('$ctrl.user.email')" class="help-block">Required Field</span>
</div>

<div ng-class="$ctrl.isValid('$ctrl.user.hashed_pwd')">
<label for="hashed_pwd">Password</label>
<input ng-model='$ctrl.user.hashed_pwd' name="hashed_pwd" id="hashed_pwd" class="form-control" required>
<span ng-if="$ctrl.isValid('$ctrl.user.hashed_pwd')" class="help-block">Required Field</span>
</div>

<div class="form-group">
  <button ng-class="$ctrl.isDisabled()" ng-disabled="$ctrl.isDisabled()" type="submit" class="btn btn-primary">
    Sign Up
</button>
</div>

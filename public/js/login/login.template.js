<div class="header-one">
<h1>mandala</h1>
</div>
<div class="header-two">
<h2>log in</h2>
</div>

<div class="form-holder">
  <form name="$ctrl.loginForm" novalidate ng-submit="$ctrl.loginUserForm()">

  <div  class="field" ng-class="$ctrl.isValid('$ctrl.user.user_name')">
  <label for="user_name">Name</label>
  <input ng-model='$ctrl.user.user_name' name="user_name" id="user_name" class="form-control" required>
  <span ng-if="$ctrl.isValid('$ctrl.user.user_name')" class="help-block">Required Field</span>
  </div>

  <div  class="field" ng-class="$ctrl.isValid('$ctrl.user.hashed_pwd')">
  <label for="hashed_pwd">Password</label>
  <input ng-model='$ctrl.user.hashed_pwd' name="hashed_pwd" id="hashed_pwd" class="form-control" required>
  <span ng-if="$ctrl.isValid('$ctrl.user.hashed_pwd')" class="help-block">Required Field</span>
  </div>

  <div class="field form-group">
    <button class="waves-effect waves-light btn blue-grey btn btn-primary" ng-class="$ctrl.isDisabled()" ng-disabled="$ctrl.isDisabled()" type="submit">
      log in
  </button>
  </div>
  </form>
</div>

/**
 * @module Jvm
 */
module JVM {

  /**
   * Adds common properties and functions to the scope
   * @method configureScope
   * @for Jvm
   * @param {ng.IScope} $scope
   * @param {ng.ILocationService} $location
   * @param {Core.Workspace} workspace
   */
  export function configureScope($scope, $location, workspace) {

    $scope.isActive = (href) => {
      var tidy = Core.trimLeading(href, "#");
      var loc = $location.path();
      return loc === tidy;
    };

    $scope.isValid = (link) => {
      return link && link.isValid(workspace);
    };

    $scope.breadcrumbs = [
      {
        content: '<i class=" icon-signin"></i> Remote',
        title: "Connect to a remote JVM running Jolokia",
        isValid: (workspace:Workspace) => true,
        href: "#/jvm/connect"
      },
      {
        content: '<i class="icon-list-ul"></i> Local',
        title: "View a diagram of the route",
        isValid: (workspace:Workspace) => workspace.treeContainsDomainAndProperties('io.hawt.jvm.local', {type: 'JVMList'}),
        href: "#/jvm/local"
      }
    ];
  }
}

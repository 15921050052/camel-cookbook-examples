/**
 * @module Wiki
 */
module Wiki {

  export function CommitController($scope, $location, $routeParams, workspace:Workspace, marked, fileExtensionTypeRegistry, wikiRepository:GitWikiRepository) {

    Wiki.initScope($scope, $routeParams, $location);
    $scope.commitId = $scope.pageId;
    $scope.selectedItems = [];

    // TODO we could configure this?
    $scope.dateFormat = 'EEE, MMM d, y : hh:mm:ss a';

    $scope.gridOptions = {
      data: 'commits',
      showFilter: false,
      selectedItems: $scope.selectedItems,
      filterOptions: {
        filterText: ''
      },
      columnDefs: [
        {
          field: 'path',
          displayName: 'Name',
          cellTemplate: '<div class="ngCellText"><a ng-href="#/wiki/version/{{row.entity.path}}/{{commitId}}{{hash}}">{{row.entity.name}}</a></div>',
          cellFilter: ""
        }
      ]
    };

    $scope.$on("$routeChangeSuccess", function (event, current, previous) {
      // lets do this asynchronously to avoid Error: $digest already in progress
      setTimeout(updateView, 50);
    });

    $scope.$watch('workspace.tree', function () {
      if (!$scope.git && Git.getGitMBean(workspace)) {
        // lets do this asynchronously to avoid Error: $digest already in progress
        //console.log("Reloading the view as we now seem to have a git mbean!");
        setTimeout(updateView, 50);
      }
    });

    updateView();

    function updateView() {
     wikiRepository.commitTree($scope.commitId, (commits) => {
        $scope.commits = commits;
        Core.$apply($scope);
      });
    }
  }
}

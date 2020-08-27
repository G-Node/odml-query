<!-- This file has been modified from the original Fuseki distribution -->
<div class="container-fluid">
  <% if (datasets.length > 0) { %>
    <table class='table ijd'>
      <thead>
          <tr>
            <th class="col-xs-3">dataset name</th>
            <th class="col-xs-9">actions</th>
          </tr>
      </thead>
      <tbody>
          <% _.each( datasets, function( ds ) { %>
            <tr>
              <td class="col-xs-3">
                <%= ds.name() %>
              </td>
              <td class="col-xs-9">
                <a class="btn btn-sm action remove btn-primary" href="dataset.html?tab=query&ds=<%= ds.name() %>">
                    Dataset query
                </a>
              </td>
            </tr>
          <% }) %>
      </tbody>
    </table>

   <% } else { %>
    <p>There are no available datasets on this server.</p>
   <% } %>
</div>

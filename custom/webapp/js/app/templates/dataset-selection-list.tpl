<!-- This file has been modified from the original Fuseki distribution -->
<div class="col-md-span-12">
  <% if (datasets.length > 0) { %>
    <table class='table ijd'>
      <tr class="headings"><th>dataset name</th><th>actions</th></tr>
      <% _.each( datasets, function( ds ) { %>
        <tr>
          <td>
            <%= ds.name() %>
          </td>
          <td>
            <a class="btn btn-sm action remove btn-primary" href="dataset.html?tab=query&ds=<%= ds.name() %>">
                <i class='fa fa-question-circle'></i> query
            </a>
          </td>
        </tr>
      <% }) %>

    </table>
   <% } else { %>
    <p>There are no available datasets on this server.</p>
   <% } %>
</div>

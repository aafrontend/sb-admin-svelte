<script>
  import Table from "sveltestrap/src/Table.svelte";
  import { Button } from "sveltestrap";
  import jQuery from "jquery";
  import { onMount, tick } from "svelte";
  import { load } from "../userdata.js";

  let el; // table element
  let table; // table object (API)

  const dataPromise = load();

  onMount(() => {
    dataPromise.then(tick).then(() => {
      table = jQuery(el).DataTable();
    });
  });
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="//cdn.datatables.net/1.10.21/css/jquery.dataTables.min.css" />
</svelte:head>

<table bind:this={el} class="display" style="width:100%">
  <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Email</th>
      <th>Mobile</th>
      <th>Type</th>
      <th>Status</th>
      <th>Register Date</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {#await dataPromise then rows}
      {#each rows as row}
        <tr>
          <td>{row.id}</td>
          <td>{row.name}</td>
          <td>{row.email}</td>
          <td>{row.mobile}</td>
          <td>{row.type}</td>
          <td>{row.status}</td>
          <td>{row.date}</td>
          <td>
            <Button size="sm" color="info">{row.action}</Button>
          </td>
        </tr>
      {/each}
    {/await}
  </tbody>
</table>

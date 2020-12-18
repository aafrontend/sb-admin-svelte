<script>
  import Table from "sveltestrap/src/Table.svelte";
  import { Button } from "sveltestrap";
  import jQuery from "jquery";
  import { onMount, tick } from "svelte";
  import { load } from "../admindata.js";

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
      <th>Username</th>
      <th>Role</th>
      <th>Created</th>
      <th>Action</th>
      
    </tr>
  </thead>
  <tbody>
    {#await dataPromise then rows}
      {#each rows as row}
        <tr>
          <td>{row.username}</td>
          <td>{row.role}</td>
          <td>{row.created}</td>
          
          <td>
            <Button size="sm" color="info">{row.action}</Button>
            <Button size="sm" color="danger">delete</Button>
          </td>
        </tr>
      {/each}
    {/await}
  </tbody>
</table>

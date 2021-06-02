<script>
  import Table from "sveltestrap/src/Table.svelte";
  import { Button } from "sveltestrap";
  import jQuery from "jquery";
  import { onMount, tick } from "svelte";
  import { load } from "../userdata.js";

  let el; // table element
  let table; // table object (API)
  const dataPromise = load().catch((e) => {
    console.error(e);
  });
  onMount(() => {
    console.log(dataPromise);
    dataPromise.then(tick).then(() => {
      table = jQuery(el).DataTable();
    });
  });
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="//cdn.datatables.net/1.10.21/css/jquery.dataTables.min.css"
  />
</svelte:head>

<table bind:this={el} class="display" style="width:100%">
  <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Email</th>
      <th>Notification</th>
      <th>Mobile</th>
      <th>Type</th>
      <th>Register Date</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {#await dataPromise then rows}
      {#each rows as row}
        <tr>
          <td>{row.user_id}</td>
          <td>{row.user_name}</td>
          <td>{row.user_email}</td>
          {#if row.user_notification == 1}
            <td>Yes</td>
          {:else}
            <td>No</td>
          {/if}
          <td>{row.user_mobile}</td>
          <td>{row.user_accounttype}</td>
          <td>{row.user_registerdate}</td>
          <td>
            <Button size="sm" color="info">Edit</Button>
          </td>
        </tr>
      {/each}
    {/await}
  </tbody>
</table>

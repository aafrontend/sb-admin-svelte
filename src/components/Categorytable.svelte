<script>
  import Table from "sveltestrap/src/Table.svelte";
  import { Button } from "sveltestrap";
  import jQuery from "jquery";
  import { onMount, tick } from "svelte";
  import { load } from "../categorydata.js";

  let el; // table element
  let table; // table object (API)

  const dataPromise = load();

  onMount(() => {
    dataPromise.then(tick).then(() => {
      table = jQuery(el).DataTable();
    });
  });

  const color = "info";
</script>

<!--
<Table bordered responsive>
  <thead>
    <tr>
      {#each tableHeading as heading}
        <th>{heading}</th>
      {/each}
    </tr>
  </thead>
  <tbody>
    {#each tableData as data}
      <tr>
        <th scope="row">{data.SNo}</th>
        <td>{data.firstName}</td>
        <td>{data.lastName}</td>
        <td>{data.userName}</td>
      </tr>
    {/each}
  </tbody>
</Table>
-->

<svelte:head>
  <link
    rel="stylesheet"
    href="//cdn.datatables.net/1.10.21/css/jquery.dataTables.min.css" />
</svelte:head>

<table bind:this={el} class="display" style="width:100%">
  <thead>
    <tr>
      <th>ID</th>
      <th>Category Name</th>
      <th>Image</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {#await dataPromise then rows}
      {#each rows as row}
        <tr>
          <td>{row.cid}</td>
          <td>{row.categoryname}</td>
          <td>{row.image}</td>

          <td>
            <Button {color}>{row.action}</Button>
            <Button {color}>delete</Button>
          </td>
        </tr>
      {/each}
    {/await}
  </tbody>
</table>

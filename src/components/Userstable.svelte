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

  const tableHeading = ["#", "First Name", "Last-Name", "Username"];
  const tableData = [
    { SNo: "1", firstName: "Mark", lastName: "Otto", userName: "@mdo" },
    { SNo: "2", firstName: "Jacob", lastName: "Thornton", userName: "@fat" },
    {
      SNo: "3",
      firstName: "Larry",
      lastName: "the Bird",
      userName: "@twitter",
    },
  ];

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
            <Button {color}>{row.action}</Button>
          </td>
        </tr>
      {/each}
    {/await}
  </tbody>
</table>

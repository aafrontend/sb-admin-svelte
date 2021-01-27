<script>
  import Table from "sveltestrap/src/Table.svelte";
  import { Button } from "sveltestrap";
  import jQuery from "jquery";
  import { onMount, tick } from "svelte";
  import { load } from "../questiondata.js";

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
      <th>Image</th>
      <th>Question</th>
      <th>Option A</th>
      <th>Option B</th>
      <th>Option C</th>
      <th>Option D</th>
      <th>Answer</th>
      <th>Level</th>
      <th style="width:110px">Action</th>
    </tr>
  </thead>
  <tbody>
    {#await dataPromise then rows}
      {#each rows as row}
        <tr>
          <td>{row.q_id}</td>
          <td>[IMAGE]]</td>
          <td>{row.question}</td>
          <td>{row.option_a}</td>
          <td>{row.option_b}</td>
          <td>{row.option_c}</td>
          <td>{row.option_d}</td>
          <td>{row.answer}</td>
          <td>{row.difficulty}</td>

          <td>
            <Button size="sm" color="info">edit</Button>
            <Button size="sm" color="danger">delete</Button>
          </td>
        </tr>
      {/each}
    {/await}
  </tbody>
</table>

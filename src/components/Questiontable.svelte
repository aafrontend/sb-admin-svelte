<script>
  import Table from "sveltestrap/src/Table.svelte";
  import { Button } from "sveltestrap";
  import jQuery from "jquery";
  import { onMount, tick } from "svelte";
  import { load } from "../questiondata.js";

  let el; // table element
  let table; // table object (API)

  const dataPromise = load();

  onMount(() => {
    dataPromise.then(tick).then(() => {
      table = jQuery(el).DataTable();
    });
  });

  const cyancolor = ["info"];
  const redcolor = ["danger"];
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
      <th>Image</th>
      <th>Question</th>
      <th>Option A</th>
      <th>Option B</th>
      <th>Option C</th>
      <th>Option D</th>
      <th>Answer</th>
      <th>Level</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {#await dataPromise then rows}
      {#each rows as row}
        <tr>
          <td>{row.qid}</td>
          <td>{row.image}</td>
          <td>{row.question}</td>
          <td>{row.opt_a}</td>
          <td>{row.opt_b}</td>
          <td>{row.opt_c}</td>
          <td>{row.opt_d}</td>
          <td>{row.answer}</td>
          <td>{row.level}</td>

          <td>
            {#each cyancolor as color}
              <Button size="sm" {color}>{row.action}</Button>
            {/each}
            {#each redcolor as color}
              <Button size="sm" {color}>delete</Button>
            {/each}
          </td>
        </tr>
      {/each}
    {/await}
  </tbody>
</table>

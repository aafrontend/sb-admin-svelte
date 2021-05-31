<script>
  import Table from "sveltestrap/src/Table.svelte";
  import { Button } from "sveltestrap";
  import jQuery from "jquery";
  import { onMount, tick } from "svelte";
  import { load } from "../categorydata.js";
  import Modal from "../components/Modal.svelte";
  import Form from "sveltestrap/src/Form.svelte";
  import FormGroup from "sveltestrap/src/FormGroup.svelte";
  import Label from "sveltestrap/src/Label.svelte";
  import Input from "sveltestrap/src/Input.svelte";

  let el; // table element
  let table; // table object (API)

  let modal;
  let category;

  const dataPromise = load().catch((e) => {
    console.error(e);
  });
  onMount(() => {
    console.log(dataPromise);
    dataPromise.then(tick).then(() => {
      table = jQuery(el).DataTable();
    });
  });

  function clickHandler(row) {
    category = row.category;
    modal.show();
  }

  function editCategory(modal) {
    fetch(`http://localhost:5000/api/quiz/questions`, {
      method: "PUT",
    }).then((resp) => resp.json());
    modal.hide();
  }
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
      <th>Category Name</th>
      <th>Image Url</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {#await dataPromise then rows}
      {#each rows as row}
        <tr>
          <td>{row.c_id}</td>
          <td>{row.category}</td>
          <td>{row.pictureurl}</td>
          <td>
            <Button on:click={() => clickHandler(row)} size="sm" color="info"
              >edit</Button
            >
            <Button size="sm" color="danger">delete</Button>
          </td>
        </tr>
      {/each}
    {/await}
  </tbody>
</table>

<Modal bind:this={modal}>
  <h3>Edit Category</h3>
  &nbsp;
  <Form>
    <FormGroup>
      <Label for="exampleCategoryName" class="small mb-1">Category Name</Label>
      <Input
        class="py-4"
        type="text"
        disabled
        name="text"
        id="categoryName"
        placeholder={category}
      />
    </FormGroup>

    <FormGroup>
      <Label for="examplePassword" class="small mb-1"
        >Google-Drive Image Url</Label
      >
      <Input
        class="py-4"
        type="text"
        name="text"
        id="categoryPictureUrl"
        placeholder="Image Url"
      />
    </FormGroup>

    <Button
      block
      color="primary"
      size="sm"
      on:click={() => editCategory(modal, category)}>Confirm Changes</Button
    >
  </Form>
</Modal>

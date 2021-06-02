<script>
  import Table from "sveltestrap/src/Table.svelte";
  import { Button } from "sveltestrap";
  import jQuery from "jquery";
  import { onMount, tick } from "svelte";
  import { load } from "../categorydata.js";
  import Modal from "sveltestrap/src/Modal.svelte";
  import ModalBody from "sveltestrap/src/ModalBody.svelte";
  import ModalFooter from "sveltestrap/src/ModalFooter.svelte";
  import ModalHeader from "sveltestrap/src/ModalHeader.svelte";
  import Form from "sveltestrap/src/Form.svelte";
  import FormGroup from "sveltestrap/src/FormGroup.svelte";
  import Label from "sveltestrap/src/Label.svelte";
  import Input from "sveltestrap/src/Input.svelte";

  let el; // table element
  let table; // table object (API)

  let modal;
  let deleteModal;
  let category;
  let pictureurl;
  let description;

  const dataPromise = load().catch((e) => {
    console.error(e);
  });
  onMount(() => {
    console.log(dataPromise);
    dataPromise.then(tick).then(() => {
      table = jQuery(el).DataTable();
    });
  });

  export function reload() {
    console.log(dataPromise);
    dataPromise.then(tick).then(() => {
      table = jQuery(el).DataTable();
    });
  }

  let open = false;
  let openDel = false;
  let size;
  const toggle = () => {
    size = "lg";
    if (!open && !openDel) {
      open = !open;
    } else if (open && !openDel) {
      open = !open;
    } else if (!open && openDel) {
      openDel = !openDel;
    } else {
      // do nothing
    }
  };
  const toggleDel = () => {
    size = "lg";
    openDel = !openDel;
  };

  function clickHandler(row) {
    category = row.category;
    pictureurl = row.pictureurl;
    description = row.description;
    toggle();
  }

  function delClickHandler(row) {
    category = row.category;
    pictureurl = row.pictureurl;
    description = row.description;
    toggleDel();
  }

  function editCategory() {
    let data = {
      category: category,
      pictureurl: pictureurl,
      description: description,
    };
    console.log(JSON.stringify(data));
    if (category == "" || pictureurl == "" || description == "") {
      alert("Please fill in the fields");
    } else {
      fetch(`http://localhost:5000/api/quiz/categories`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((resp) => resp.json());
      alert("Changes saved successfully!");
      toggle();
    }
  }

  function deleteCategory() {
    let data = {
      category: category,
    };
    console.log(JSON.stringify(data));
    fetch(`http://localhost:5000/api/quiz/categories`, {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
    alert("Category deleted successfully!");
    toggleDel();
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
          <td>{row.description}</td>

          <td>
            <Button on:click={() => clickHandler(row)} size="sm" color="info"
              >edit</Button
            >
            <Button
              size="sm"
              color="danger"
              on:click={() => delClickHandler(row)}>delete</Button
            >
          </td>
        </tr>
      {/each}
    {/await}
  </tbody>
</table>

<Modal isOpen={open} {toggle} {size}>
  <ModalHeader {toggle}>Edit Category</ModalHeader>
  <ModalBody>
    <Form>
      <FormGroup>
        <Label for="exampleCategoryName" class="small mb-1">Category Name</Label
        >
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
          bind:value={pictureurl}
        />
      </FormGroup>

      <FormGroup>
        <Label for="examplePassword" class="small mb-1">Description</Label>
        <Input
          class="py-4"
          type="textarea"
          name="text"
          id="description"
          placeholder="Image Url"
          bind:value={description}
        />
      </FormGroup>
    </Form>
  </ModalBody>
  <ModalFooter>
    <Button block color="primary" size="sm" on:click={() => editCategory(modal)}
      >Confirm Changes</Button
    >
  </ModalFooter>
</Modal>

<Modal isOpen={openDel} {toggle} {size}>
  <ModalHeader {toggle}>Delete Category</ModalHeader>
  <ModalBody>
    <Form>
      <FormGroup>
        <Label for="exampleCategoryName" class="small mb-1">Category Name</Label
        >
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
          disabled
          id="categoryPictureUrl"
          placeholder={pictureurl}
        />
      </FormGroup>

      <FormGroup>
        <Label for="examplePassword" class="small mb-1">Description</Label>
        <Input
          class="py-4"
          type="textarea"
          name="text"
          disabled
          id="description"
          placeholder={description}
        />
      </FormGroup>
    </Form>
  </ModalBody>
  <ModalFooter>
    <Button
      block
      color="primary"
      size="sm"
      on:click={() => deleteCategory(modal)}>Confirm Delete</Button
    >
  </ModalFooter>
</Modal>

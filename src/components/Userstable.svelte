<script>
  import { Button } from "sveltestrap";
  import jQuery from "jquery";
  import { onMount, tick } from "svelte";
  import { load } from "../userdata.js";
  import Modal from "sveltestrap/src/Modal.svelte";
  import ModalBody from "sveltestrap/src/ModalBody.svelte";
  import ModalFooter from "sveltestrap/src/ModalFooter.svelte";
  import ModalHeader from "sveltestrap/src/ModalHeader.svelte";
  import Form from "sveltestrap/src/Form.svelte";
  import FormGroup from "sveltestrap/src/FormGroup.svelte";
  import Label from "sveltestrap/src/Label.svelte";
  import Input from "sveltestrap/src/Input.svelte";

  let id;
  let name;
  let email;
  let notification;
  let mobile;
  let type;
  let registerDate;

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

  let open = false;
  let size;
  const toggle = () => {
    size = undefined;
    open = !open;
  };

  function clickHandler(row) {
    id = row.user_id;
    name = row.user_name;
    email = row.user_email;
    mobile = row.user_mobile;
    type = row.user_accounttype;
    registerDate = row.user_registerdate;
    if (row.user_notification == 1) {
      notification = "Yes";
    } else {
      notification = "No";
    }
    toggle();
  }

  function deleteUser() {
    let data = {
      user_email: email,
    };
    console.log(JSON.stringify(data));
    fetch(
      `http://ec2-54-255-217-149.ap-southeast-1.compute.amazonaws.com:5000/api/user/users`,
      {
        method: "DELETE",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((resp) => resp.json());
    alert("User Deleted successfully!");
    toggle();
    location.reload();
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
            <Button size="sm" color="danger" on:click={() => clickHandler(row)}
              >Delete</Button
            >
          </td>
        </tr>
      {/each}
    {/await}
  </tbody>
</table>

<Modal isOpen={open} {toggle} {size}>
  <ModalHeader {toggle}>Delete User</ModalHeader>
  <ModalBody>
    <Form>
      <FormGroup>
        <Label for="exampleUsername" class="small mb-1">Name</Label>
        <Input
          class="py-4"
          type="text"
          disabled
          name="name"
          id="username"
          placeholder={name}
        />
      </FormGroup>

      <FormGroup>
        <Label for="exampleEmail" class="small mb-1">Email</Label>
        <Input
          class="py-4"
          type="text"
          name="text"
          id="email"
          placeholder="Email"
          disabled
          bind:value={email}
        />
      </FormGroup>

      <FormGroup>
        <Label for="exampleNotification" class="small mb-1">Notification</Label>
        <Input
          class="py-4"
          type="text"
          name="text"
          id="notification"
          placeholder="Notification"
          disabled
          bind:value={notification}
        />
      </FormGroup>

      <FormGroup>
        <Label for="exampleMobile" class="small mb-1">Mobile</Label>
        <Input
          class="py-4"
          type="text"
          name="text"
          id="mobile"
          placeholder="Mobile"
          disabled
          bind:value={mobile}
        />
      </FormGroup>

      <FormGroup>
        <Label for="exampleType" class="small mb-1">Type</Label>
        <Input
          class="py-4"
          type="text"
          name="text"
          id="type"
          placeholder="Type"
          disabled
          bind:value={type}
        />
      </FormGroup>

      <FormGroup>
        <Label for="exampleMobile" class="small mb-1">Register Date</Label>
        <Input
          class="py-4"
          type="text"
          name="text"
          id="regDate"
          placeholder="Register Date"
          disabled
          bind:value={registerDate}
        />
      </FormGroup>
    </Form>
  </ModalBody>
  <ModalFooter>
    <Button block color="primary" size="sm" on:click={() => deleteUser()}
      >Delete User</Button
    >
  </ModalFooter>
</Modal>

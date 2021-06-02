<script>
  import Table from "sveltestrap/src/Table.svelte";
  import { Button } from "sveltestrap";
  import jQuery from "jquery";
  import { onMount, tick } from "svelte";
  import { load } from "../questionreports.js";
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

  let id;
  let message;
  let receiveDate;

  const dataPromise = load();

  onMount(() => {
    dataPromise.then(tick).then(() => {
      table = jQuery(el).DataTable();
    });
  });

  function clickHandler(row) {
    id = row.fb_id;
    message = row.feedback;
    receiveDate = row.receive_date;
    toggle();
  }

  let open = false;
  let size;
  const toggle = () => {
    size = undefined;
    open = !open;
  };

  function deleteFeedback() {
    let data = {
      fb_id: id,
    };
    console.log(JSON.stringify(data));
    fetch(`http://localhost:5000/api/feedback/feedback`, {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
    alert("Report deleted successfully!");
    toggle();
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
      <th>Report ID</th>
      <th>Message</th>
      <th>Date</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {#await dataPromise then rows}
      {#each rows as row}
        <tr>
          <td>{row.fb_id}</td>
          <td>{row.feedback}</td>
          <td>{row.receive_date}</td>
          <td>
            <Button size="sm" color="danger" on:click={() => clickHandler(row)}
              >delete</Button
            >
          </td>
        </tr>
      {/each}
    {/await}
  </tbody>
</table>

<Modal isOpen={open} {toggle} {size}>
  <ModalHeader {toggle}>Delete Feedback</ModalHeader>
  <ModalBody>
    <Form>
      <FormGroup>
        <Label for="exampleCategoryName" class="small mb-1">Report ID</Label>
        <Input
          class="py-4"
          type="text"
          disabled
          name="text"
          id="reportID"
          placeholder={id}
        />
      </FormGroup>

      <FormGroup>
        <Label for="examplePassword" class="small mb-1">Message</Label>
        <Input
          class="py-4"
          type="textarea"
          name="text"
          id="feedback"
          placeholder="Message"
          disabled
          bind:value={message}
        />
      </FormGroup>

      <FormGroup>
        <Label for="examplePassword" class="small mb-1">Date</Label>
        <Input
          class="py-4"
          type="text"
          name="text"
          id="description"
          placeholder="receiveDate"
          disabled
          bind:value={receiveDate}
        />
      </FormGroup>
    </Form>
  </ModalBody>
  <ModalFooter>
    <Button block color="primary" size="sm" on:click={() => deleteFeedback()}
      >Delete Report</Button
    >
  </ModalFooter>
</Modal>

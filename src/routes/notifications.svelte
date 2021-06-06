<script>
  import Breadcrumb from "sveltestrap/src/Breadcrumb.svelte";
  import BreadcrumbItem from "sveltestrap/src/BreadcrumbItem.svelte";
  import Card from "sveltestrap/src/Card.svelte";
  import CardBody from "sveltestrap/src/CardBody.svelte";
  import CardHeader from "sveltestrap/src/CardHeader.svelte";
  import FormGroup from "sveltestrap/src/FormGroup.svelte";
  import Label from "sveltestrap/src/Label.svelte";
  import Input from "sveltestrap/src/Input.svelte";
  import Button from "sveltestrap/src/Button.svelte";
  import { Collapse } from "sveltestrap";
  import { goto } from "@sapper/app";
  import Userstable from "../components/Userstable.svelte";
  import initDt from "datatables.net-dt";
  import { userInfo } from "../userStore.js";
  import { onMount } from "svelte";

  initDt();
  let auth = false;
  userInfo.subscribe((a) => (auth = a));
  onMount(async () => {
    try {
      const response = await fetch(
        "ec2-54-255-217-149.ap-southeast-1.compute.amazonaws.com:8000/api/user",
        {
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      const content = await response;

      if (content.status !== 200) {
        goto("/pages/authentication/login");
      }

      //console.log(content);
      userInfo.set(true);
    } catch (err) {
      userInfo.set(false);
      goto("/pages/authentication/login");
    }
  });

  //input values
  let isAttachedImage = false;
</script>

<h3 class="mt-4">Send Notifications to User</h3>
<Breadcrumb class="mb-4">
  <BreadcrumbItem><a href=".">Dashboard</a></BreadcrumbItem>
  <BreadcrumbItem active>Send Notifications</BreadcrumbItem>
</Breadcrumb>

<Card class="mb-4">
  <CardBody>
    <FormGroup>
      <Label for="exampleSelect" class="small mb-1">Select Users</Label>
      <Input type="select" name="select" id="exampleSelect">
        <option value="" selected disabled hidden>Select group to send</option>
        <option>Selected only</option>
        <option>All</option>
      </Input>
    </FormGroup>

    <FormGroup>
      <Label for="exampleSelect" class="small mb-1">Type</Label>
      <Input type="select" name="select" id="exampleSelect">
        <option value="" selected disabled hidden>Select type</option>
        <option>Default</option>
        <option>Main Category</option>
      </Input>
    </FormGroup>

    <FormGroup>
      <Label for="exampleEmail" class="small mb-1">Title</Label>
      <Input type="text" name="text" />
    </FormGroup>

    <FormGroup>
      <Label for="exampleText" class="small mb-1">Message</Label>
      <Input type="textarea" name="text" id="exampleText" />
    </FormGroup>

    <FormGroup check>
      <Label check>
        <Input type="checkbox" bind:checked={isAttachedImage} />
        Include Image
      </Label>
    </FormGroup>

    <Collapse isOpen={isAttachedImage}>
      <Input type="file" name="file" id="exampleFile" />
    </Collapse>

    <hr />

    <Button block color="primary">Send Notification</Button>
  </CardBody>
</Card>

<Card class="mb-4">
  <CardHeader>
    <svg
      class="svg-inline--fa fa-table fa-w-16"
      aria-hidden="true"
      focusable="false"
      data-prefix="fas"
      data-icon="table"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      data-fa-i2svg=""
    >
      <path
        fill="currentColor"
        d="M464 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h416c26.51
        0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zM224
        416H64v-96h160v96zm0-160H64v-96h160v96zm224
        160H288v-96h160v96zm0-160H288v-96h160v96z"
      />
    </svg>
    Users
  </CardHeader>
  <CardBody>
    <Userstable />
  </CardBody>
</Card>

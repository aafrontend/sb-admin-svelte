<script>
  import Breadcrumb from "sveltestrap/src/Breadcrumb.svelte";
  import BreadcrumbItem from "sveltestrap/src/BreadcrumbItem.svelte";
  import Card from "sveltestrap/src/Card.svelte";
  import CardBody from "sveltestrap/src/CardBody.svelte";
  import CardHeader from "sveltestrap/src/CardHeader.svelte";
  import Form from "sveltestrap/src/Form.svelte";
  import FormGroup from "sveltestrap/src/FormGroup.svelte";
  import Label from "sveltestrap/src/Label.svelte";
  import Input from "sveltestrap/src/Input.svelte";
  import Button from "sveltestrap/src/Button.svelte";
</script>

<h3 class="mt-4">Notification Settings</h3>

<Card class="mb-4">
  <CardHeader>Update FCM Server Key</CardHeader>
  <CardBody>
    <FormGroup>
      <Label for="exampleText" class="small mb-1">FCM Server Key</Label>
      <Input type="textarea" name="text" id="exampleText" />
    </FormGroup>

    <hr />

    <Button block color="primary">Update FCM Server Key</Button>
  </CardBody>
</Card>

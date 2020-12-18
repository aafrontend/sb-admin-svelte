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

  import Table from "../../components/Table.svelte";
</script>

<h1 class="mt-4">Terms and Conditions</h1>

<Card class="mb-4">
  <CardHeader>Update Terms and Condition</CardHeader>
  <CardBody>
    <FormGroup>
      <Label for="exampleText" class="small mb-1">Terms and Conditions</Label>
      <Input type="textarea" name="text" id="exampleText" />
    </FormGroup>

    <hr />

    <Button block color="primary">Update Terms</Button>
  </CardBody>
</Card>

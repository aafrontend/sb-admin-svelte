<script>
  import Breadcrumb from "sveltestrap/src/Breadcrumb.svelte";
  import BreadcrumbItem from "sveltestrap/src/BreadcrumbItem.svelte";
  import Card from "sveltestrap/src/Card.svelte";
  import CardBody from "sveltestrap/src/CardBody.svelte";
  import CardHeader from "sveltestrap/src/CardHeader.svelte";
  import CardFooter from "sveltestrap/src/CardFooter.svelte";
  import Input from "sveltestrap/src/Input.svelte";
  import Button from "sveltestrap/src/Button.svelte";

  import Table from "../components/Table.svelte";
</script>

<h3 class="mt-4">Import Questions</h3>
<Breadcrumb class="mb-4">
  <BreadcrumbItem><a href=".">Dashboard</a></BreadcrumbItem>
  <BreadcrumbItem active>Import Questions</BreadcrumbItem>
</Breadcrumb>

<Card class="mb-4">
  <CardHeader>CSV Question File</CardHeader>
  <CardBody>
    <Input type="file" name="file" id="exampleFile" />
    <hr />
    <Button size="sm" color="warning">Download Sample File Here</Button>
    <hr />
    <Button block color="primary">Upload</Button>
  </CardBody>
</Card>

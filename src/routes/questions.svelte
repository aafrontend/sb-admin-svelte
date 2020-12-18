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

  import Questiontable from "../components/Questiontable.svelte";

  const yellowcolor = ["warning"];
</script>

<h1 class="mt-4">Questions for Quiz</h1>
<Breadcrumb class="mb-4">
  <BreadcrumbItem><a href=".">Dashboard</a></BreadcrumbItem>
  <BreadcrumbItem active>Questions</BreadcrumbItem>
</Breadcrumb>

<Card class="mb-4">
  <CardHeader>Create a Question</CardHeader>
  <CardBody>
    <FormGroup>
      <Label for="exampleSelect" class="small mb-1">Category</Label>
      <Input type="select" name="select" id="exampleSelect">
        <option value="" selected disabled hidden>Choose a Category</option>
        <option>Singapore Trivia</option>
        <option>National Day Songs</option>
        <option>Singapore History</option>
        <option>Singlish</option>
        <option>Tourist Attractions</option>
      </Input>
    </FormGroup>

    <FormGroup>
      <Label for="exampleText" class="small mb-1">Question</Label>
      <Input type="textarea" name="text" id="exampleText" />
    </FormGroup>

    <FormGroup>
      <Label for="exampleFile" class="small mb-1">Image</Label>
      <Input type="file" name="file" id="exampleFile" />
    </FormGroup>

    <FormGroup>
      <Label for="exampleEmail" class="small mb-1">A</Label>
      <Input type="text" name="text" />
    </FormGroup>

    <FormGroup>
      <Label for="exampleEmail" class="small mb-1">B</Label>
      <Input type="text" name="text" />
    </FormGroup>

    <FormGroup>
      <Label for="exampleEmail" class="small mb-1">C</Label>
      <Input type="text" name="text" />
    </FormGroup>

    <FormGroup>
      <Label for="exampleEmail" class="small mb-1">D</Label>
      <Input type="text" name="text" />
    </FormGroup>

    <FormGroup>
      <Label for="exampleSelect" class="small mb-1">Correct Answer</Label>
      <Input type="select" name="select" id="exampleSelect">
        <option value="" selected disabled hidden>Select Right Answer</option>
        <option>A</option>
        <option>B</option>
        <option>C</option>
        <option>D</option>
      </Input>
    </FormGroup>

    <FormGroup>
      <Label for="exampleEmail" class="small mb-1">Level</Label>
      <Input type="text" name="text" />
    </FormGroup>

    <hr />
    
    <Button block color="primary">Create New</Button>
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
      data-fa-i2svg="">
      <path
        fill="currentColor"
        d="M464 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h416c26.51
        0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zM224
        416H64v-96h160v96zm0-160H64v-96h160v96zm224
        160H288v-96h160v96zm0-160H288v-96h160v96z" />
    </svg>
    DataTable Example
  </CardHeader>
  <CardBody>
    <Questiontable />
  </CardBody>
</Card>

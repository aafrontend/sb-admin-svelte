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
  import { onMount } from "svelte";
  import initDt from "datatables.net-dt";

  initDt();

  let categories = [];
  var csv;

  onMount(() => {
    fetch(
      `http://ec2-54-255-217-149.ap-southeast-1.compute.amazonaws.com:5000/api/quiz/categories/`,
      {
        method: "GET",
      }
    )
      .then((resp) => resp.json())
      .then((data) => (categories = data));
  });

  const yellowcolor = ["warning"];

  let categoryInput = "";
  let question = "";
  let opta = "";
  let optb = "";
  let optc = "";
  let optd = "";
  let ans = "";
  let level = "";
  let stats = 1;

  async function newQuestion() {
    let data = {
      category: categoryInput,
      difficulty: level,
      question: question,
      option_a: opta,
      option_b: optb,
      option_c: optc,
      option_d: optd,
      answer: ans,
      stats_a: stats,
      stats_b: stats,
      stats_c: stats,
      stats_d: stats,
    };
    console.log(JSON.stringify(data));
    if (
      categoryInput == "" ||
      question == "" ||
      opta == "" ||
      optb == "" ||
      optc == "" ||
      optd == "" ||
      ans == "" ||
      level == ""
    ) {
      alert("Please fill in the fields");
    } else {
      fetch(`http://localhost:5000/api/quiz/questions/add`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("Question added!");
    }
  }
</script>

<h3 class="mt-4">Questions for Quiz</h3>
<Breadcrumb class="mb-4">
  <BreadcrumbItem><a href=".">Dashboard</a></BreadcrumbItem>
  <BreadcrumbItem active>Questions</BreadcrumbItem>
</Breadcrumb>

<Card class="mb-4">
  <CardHeader>Create a Question</CardHeader>
  <CardBody>
    <FormGroup>
      <Label for="exampleSelect" class="small mb-1">Category</Label>
      <select bind:value={categoryInput}>
        <option value="none" selected disabled hidden>Choose a Category</option>

        {#each categories as cat}
          <option value={cat.category}>{cat.category}</option>
        {/each}
      </select>
    </FormGroup>

    <FormGroup>
      <Label for="question" class="small mb-1">Question</Label>
      <Input
        type="textarea"
        name="text"
        id="exampleText"
        bind:value={question}
      />
    </FormGroup>

    <!--
      <FormGroup>
      <Label for="exampleFile" class="small mb-1">Image</Label>
      <Input type="file" name="file" id="exampleFile" />
    </FormGroup>
    -->

    <FormGroup>
      <Label for="a" class="small mb-1">A</Label>
      <Input type="text" name="text" bind:value={opta} />
    </FormGroup>

    <FormGroup>
      <Label for="b" class="small mb-1">B</Label>
      <Input type="text" name="text" bind:value={optb} />
    </FormGroup>

    <FormGroup>
      <Label for="c" class="small mb-1">C</Label>
      <Input type="text" name="text" bind:value={optc} />
    </FormGroup>

    <FormGroup>
      <Label for="d" class="small mb-1">D</Label>
      <Input type="text" name="text" bind:value={optd} />
    </FormGroup>

    <FormGroup>
      <Label for="answer" class="small mb-1">Correct Answer</Label>
      <select bind:value={ans}>
        <option selected disabled hidden>Select Right Answer</option>
        <option value="a">A</option>
        <option value="b">B</option>
        <option value="c">C</option>
        <option value="d">D</option>
      </select>
    </FormGroup>

    <FormGroup>
      <Label for="level" class="small mb-1">Level</Label>
      <Input type="text" name="text" bind:value={level} />
    </FormGroup>

    <hr />

    <Button block color="primary" on:click={newQuestion}>Create New</Button>
  </CardBody>
</Card>

<!--

<Card class="mb-4">
  <CardHeader>Upload a CSV</CardHeader>
  <CardBody>
    <FormGroup>
      <Label for="exampleFile">CSV File</Label>
      <Input
        type="file"
        name="file"
        id="exampleFile"
        accept=".csv"
        bind:files={csv}
      />
    </FormGroup>
    <hr />
    <Button block color="warning">Upload</Button>
  </CardBody>
</Card>

-->

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
    DataTable Example
  </CardHeader>
  <CardBody>
    <Questiontable />
  </CardBody>
</Card>

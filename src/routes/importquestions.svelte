<script>
  import Breadcrumb from "sveltestrap/src/Breadcrumb.svelte";
  import BreadcrumbItem from "sveltestrap/src/BreadcrumbItem.svelte";
  import Card from "sveltestrap/src/Card.svelte";
  import CardBody from "sveltestrap/src/CardBody.svelte";
  import CardHeader from "sveltestrap/src/CardHeader.svelte";
  import FormGroup from "sveltestrap/src/FormGroup.svelte";
  import Input from "sveltestrap/src/Input.svelte";
  import Button from "sveltestrap/src/Button.svelte";
  import { userInfo } from "../userStore.js";
  import { onMount } from "svelte";
  import { goto } from "@sapper/app";

  //export let multiple = false;

  var csv;
  let text = "";
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
  //let dragging = false;

  async function clickHandler() {
    //console.log(csv);
    if (csv[0].type != "application/vnd.ms-excel") {
      alert("Please upload a CSV File");
    } else {
      text = await csv[0].text();
      //console.log(text);
      let data = {
        string: text,
      };
      if (text == "") {
        alert("Please Upload a file");
      } else {
        fetch(
          `http://ec2-54-255-217-149.ap-southeast-1.compute.amazonaws.com:5000/api/quiz/questions/csv`,
          {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((resp) => resp.json())
          .then((data) => console.log(data));
        alert("Questions added!");
      }
    }
  }
</script>

<h3 class="mt-4">Import Questions</h3>
<Breadcrumb class="mb-4">
  <BreadcrumbItem><a href=".">Dashboard</a></BreadcrumbItem>
  <BreadcrumbItem active>Import Questions</BreadcrumbItem>
</Breadcrumb>

<Card class="mb-4">
  <CardHeader>CSV Question File</CardHeader>
  <CardBody>
    <FormGroup>
      <Input type="file" name="file" id="exampleFile" bind:files={csv} />
    </FormGroup>

    <hr />
    <Button
      size="sm"
      color="warning"
      target="_blank"
      href="https://drive.google.com/file/d/1QTO-lGNiq2LXz40AISJXcM5qVNBXsuni/view?usp=sharing"
      >Download Sample File Here</Button
    >
    <hr />
    <Button block color="primary" on:click={clickHandler}>Upload</Button>
  </CardBody>
</Card>

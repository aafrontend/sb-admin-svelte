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
  import { userInfo } from "../userStore.js";
  import { onMount } from "svelte";

  const userbase = window.userbase;
  let userObject = null;
  const appId = "4f0d866e-882d-4f53-88ee-2c3082abb3ff";
  let authPromise = userbase
    .init({ appId: "4f0d866e-882d-4f53-88ee-2c3082abb3ff" })
    .then(({ user }) => userInfo.set(user));

  onMount(() => {
    if (userObject !== null) {
      authPromise;
      console.log("there are no data");
      let redirect = async () => {
        if (userInfo === null) {
          goto("/pages/authentication/login");
        } else {
          open = false;
          console.log(userObject);
        }
      };
      setTimeout(redirect, 3000);
    } else {
      console.log("there are data");
      open = false;
    }
  });

  //export let multiple = false;

  var csv;
  let text = "";
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
        fetch(`http://localhost:5000/api/quiz/questions/csv`, {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((resp) => resp.json())
          .then((data) => console.log(data));
        alert("Questions added!");
      }
    }
  }

  /*
  function getFilesFromDropEvent({ dataTransfer: { files, items } }) {
    return files.length
      ? [...files]
      : items
          .filter(({ kind }) => kind === "file")
          .map(({ getAsFile }) => getAsFile());
  }

  function getFilesFromInputEvent({ target }) {
    const files = target.files ? [...target.files] : [];
    target.value = "";

    return files;
  }

  const onFile = (getFilesFunction) => (event) => {
    dragging = false;

    const files = getFilesFunction(event);
    if (files.length) {
      const csvFiles = multiple ? files : files[0];
      csvStore.loadFile(csvFiles);
    }
  };
  */
</script>

{#await authPromise}
  Loading...
{:then _}
  <h3 class="mt-4">Import Questions</h3>
  <Breadcrumb class="mb-4">
    <BreadcrumbItem><a href=".">Dashboard</a></BreadcrumbItem>
    <BreadcrumbItem active>Import Questions</BreadcrumbItem>
  </Breadcrumb>

  <Card class="mb-4">
    <CardHeader>CSV Question File</CardHeader>
    <CardBody>
      <!--
    <div class="upload" class:dragging>
      <label
        on:drop|preventDefault={onFile(getFilesFromDropEvent)}
        on:dragover|preventDefault={() => (dragging = true)}
        on:dragleave|preventDefault={() => (dragging = false)}
      >
        <slot {dragging}>
          <div class="slot">
            Drag &amp; Drop your file(s) or
            <strong>browse.</strong>
          </div>
        </slot>
        <input
          type="file"
          accept=".csv"
          bind:files={csv}
          on:input={onFile(getFilesFromInputEvent)}
        />
      </label>
    </div>
    -->

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
{/await}

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

  import Categorytable from "../components/Categorytable.svelte";

  let categoryInput = "";
  let pictureurl = "";
  let descriptionInput = "";

  async function newCategory() {
    let data1 = {
      category: categoryInput,
      pictureurl: pictureurl,
    };
    console.log(JSON.stringify(data1));
    if (categoryInput == "" || pictureurl == "" || descriptionInput == "") {
      alert("Please fill in the fields");
    } else {
      await fetch(`http://localhost:5000/api/quiz/categories`, {
        method: "POST",
        body: JSON.stringify(data1),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  }

  async function newCategory2() {
    let data2 = {
      category: categoryInput,
      pictureurl: pictureurl,
      description: descriptionInput,
    };
    const result = await newCategory();
    console.log(JSON.stringify(data2));
    if (categoryInput == "" || pictureurl == "" || descriptionInput == "") {
      alert("Please fill in the fields");
    } else {
      await fetch(`http://localhost:5000/api/quiz/categories`, {
        method: "PUT",
        body: JSON.stringify(data2),
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("Category added!");
    }
  }
</script>

<h3 class="mt-4">Main Category</h3>
<Breadcrumb class="mb-4">
  <BreadcrumbItem><a href=".">Dashboard</a></BreadcrumbItem>
  <BreadcrumbItem active>Category</BreadcrumbItem>
</Breadcrumb>

<Card class="mb-4">
  <CardHeader>Create Main Category</CardHeader>
  <CardBody>
    <FormGroup>
      <Label for="exampleCategoryName" class="small mb-1">Category Name</Label>
      <Input
        class="py-4"
        type="text"
        name="text"
        id="categoryName"
        placeholder="category name"
        bind:value={categoryInput}
      />
    </FormGroup>

    <FormGroup>
      <Label for="examplePassword" class="small mb-1"
        >Google-Drive Image Url</Label
      >
      <Input
        class="py-4"
        type="text"
        name="text"
        id="categoryPictureUrl"
        placeholder="Image Url"
        bind:value={pictureurl}
      />
    </FormGroup>

    <FormGroup>
      <Label for="examplePassword" class="small mb-1">description</Label>
      <Input
        class="py-4"
        type="textarea"
        name="text"
        id="categoryDescription"
        placeholder="Description"
        bind:value={descriptionInput}
      />
    </FormGroup>

    <hr />

    <FormGroup
      class="d-flex align-items-center justify-content-between mt-4 mb-0"
    >
      <Button block color="primary" on:click={newCategory2}>Add New</Button>
    </FormGroup>
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
    Categories
  </CardHeader>
  <CardBody>
    <Categorytable />
  </CardBody>
</Card>

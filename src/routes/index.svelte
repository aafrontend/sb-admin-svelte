<script>
  import Breadcrumb from "sveltestrap/src/Breadcrumb.svelte";
  import BreadcrumbItem from "sveltestrap/src/BreadcrumbItem.svelte";
  import Card from "sveltestrap/src/Card.svelte";
  import CardBody from "sveltestrap/src/CardBody.svelte";
  import CardHeader from "sveltestrap/src/CardHeader.svelte";
  import Row from "sveltestrap/src/Row.svelte";
  import Form from "sveltestrap/src/Form.svelte";
  import FormGroup from "sveltestrap/src/FormGroup.svelte";
  import Label from "sveltestrap/src/Label.svelte";
  import Input from "sveltestrap/src/Input.svelte";
  import CustomInput from "sveltestrap/src/CustomInput.svelte";
  import Button from "sveltestrap/src/Button.svelte";

  import DashboardCard from "../components/DashboardCard.svelte";
  import CustomCard from "../components/CustomCard.svelte";
  import Userstable from "../components/Userstable.svelte";
  import { onMount } from "svelte";
  import initDt from "datatables.net-dt";
  import { goto } from "@sapper/app";

  initDt();

  //init account
  /*
  let userObject = null;
  const userbase = window.userbase;
  const appId = "4f0d866e-882d-4f53-88ee-2c3082abb3ff";
  let authPromise = userbase
    .init({ appId: "4f0d866e-882d-4f53-88ee-2c3082abb3ff" })
    .then(({ user }) => (userObject = user));

  let username, password;
  */

  let title = "SB Admin Svelte";

  // Test scripts:
  let totalCategories;
  //let totalSubCategories;
  let totalQuestions;
  let totalUsers;

  // load data
  onMount(() => {
    /*
    authPromise;
    let redirect = async () => {
      if (userObject == null) {
        console.log(userObject);
        goto("./pages/authentication/login");
      }
    };
    setTimeout(redirect, 5000);
    */

    fetch(
      `http://ec2-54-255-217-149.ap-southeast-1.compute.amazonaws.com:5000/api/user/users`,
      {
        method: "GET",
      }
    )
      .then((resp) => resp.json())
      .then((data) => (totalUsers = data.length));

    fetch(
      `http://ec2-54-255-217-149.ap-southeast-1.compute.amazonaws.com:5000/api/quiz/categories`,
      {
        method: "GET",
      }
    )
      .then((resp) => resp.json())
      .then((data) => (totalCategories = data.length));

    fetch(
      `http://ec2-54-255-217-149.ap-southeast-1.compute.amazonaws.com:5000/api/quiz/questions`,
      {
        method: "GET",
      }
    )
      .then((resp) => resp.json())
      .then((data) => (totalQuestions = data.length));
  });
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<!--
{#await authPromise}
  Loading...
{:then _}
-->
<h3 class="mt-4">Dashboard</h3>
<Breadcrumb class="mb-4">
  <BreadcrumbItem active>Dashboard</BreadcrumbItem>
</Breadcrumb>
<Row>
  <div class="col-xl-3 col-md-6">
    <DashboardCard
      cardTitle="Total Categories"
      cardSubtitle={totalCategories}
      cardColor="dark"
      path="categories"
    />
  </div>

  <div class="col-xl-3 col-md-6">
    <DashboardCard
      cardTitle="Total Questions"
      cardSubtitle={totalQuestions}
      cardColor="dark"
      path="questions"
    />
  </div>
  <div class="col-xl-3 col-md-6">
    <DashboardCard
      cardTitle="Total Users"
      cardSubtitle={totalUsers}
      cardColor="dark"
      path="users"
    />
  </div>
</Row>
<!--
    
  <Row>
    <div class="col-xl-6">
      <CustomCard cardTitle="Monthly Leaderboard" cardIcon="fas fa-chart-bar">
        <BarChart />
      </CustomCard>
    </div>

    <div class="col-xl-6">
      <CustomCard cardTitle="Monthly Registration" cardIcon="fas fa-chart-area">
        <AreaChart />
      </CustomCard>
    </div>
  </Row>
-->
<CustomCard cardTitle="Registered Users" cardIcon="fas fa-table">
  <Userstable />
</CustomCard>

<!--
{:else}
  <div class="col-lg-5">
    <Card class="shadow-lg border-0 rounded-lg mt-5">
      <CardHeader>
        <h3 class="text-center font-weight-light my-4">Login</h3>
      </CardHeader>
      <CardBody>
        <Form>
          <FormGroup>
            <Label for="exampleEmail" class="small mb-1">Username</Label>
            <Input
              class="py-4"
              type="text"
              name="text"
              id="exampleEmail"
              placeholder="Enter username"
              bind:value={username}
            />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword" class="small mb-1">Password</Label>
            <Input
              class="py-4"
              type="password"
              name="password"
              id="examplePassword"
              placeholder="Enter password"
              bind:value={password}
            />
          </FormGroup>

          <FormGroup
            class="d-flex align-items-center justify-content-between mt-4 mb-0"
          >
            <Button color="primary" on:click={signIn}>Login</Button>
          </FormGroup>
        </Form>
      </CardBody>
    </Card>
  </div>
{/if}

{/await}
-->

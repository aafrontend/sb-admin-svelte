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
  import ModalBody from "sveltestrap/src/ModalBody.svelte";
  import ModalFooter from "sveltestrap/src/ModalFooter.svelte";
  import ModalHeader from "sveltestrap/src/ModalHeader.svelte";
  import Modal from "sveltestrap/src/Modal.svelte";
  import { userInfo } from "../userStore.js";

  initDt();

  //init account

  let open = false;
  let fullscreen = "xl";

  let userObject = null;
  const unsubscribe = userInfo.subscribe((value) => {
    userObject = value;
  });
  const userbase = window.userbase;

  const appId = "4f0d866e-882d-4f53-88ee-2c3082abb3ff";
  let authPromise = userbase
    .init({ appId: "4f0d866e-882d-4f53-88ee-2c3082abb3ff" })
    .then(({ user }) => userInfo.set(user));

  const signIn = () => {
    authPromise = userbase.signIn({ username, password }).then((user) => {
      userInfo.set(user);
    });
    /*
    let redirect = async () => {
      if (userObject != null) {
        goto("../../");
      } else {
        alert("Invalid username or password");
      }
    };setTimeout(redirect, 6000);
    */
  };

  const signOut = () =>
    (authPromise = userbase.signOut().then(() => userInfo.set(null)));

  let username, password;
  let title = "SB Admin Svelte";

  let totalCategories;
  let totalQuestions;
  let totalUsers;

  // load data
  onMount(() => {
    open = true;

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

{#await authPromise}
  Loading...
{:then _}
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
  <CustomCard cardTitle="Registered Users" cardIcon="fas fa-table">
    <Userstable />
  </CustomCard>
{/await}

<Modal isOpen={open} {fullscreen}>
  <ModalHeader>Authenticating</ModalHeader>
  <ModalBody>Please wait...</ModalBody>
</Modal>

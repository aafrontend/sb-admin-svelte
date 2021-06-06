<script>
  import Breadcrumb from "sveltestrap/src/Breadcrumb.svelte";
  import BreadcrumbItem from "sveltestrap/src/BreadcrumbItem.svelte";
  import Row from "sveltestrap/src/Row.svelte";
  import DashboardCard from "../components/DashboardCard.svelte";
  import CustomCard from "../components/CustomCard.svelte";
  import Userstable from "../components/Userstable.svelte";
  import { onMount } from "svelte";
  import initDt from "datatables.net-dt";
  import { goto } from "@sapper/app";
  import { userInfo } from "../userStore.js";

  initDt();

  //init account

  let open = false;
  let fullscreen = "xl";

  let auth = false;
  userInfo.subscribe((a) => (auth = a));

  let title = "SB Admin Svelte";

  let totalCategories;
  let totalQuestions;
  let totalUsers;

  // load data
  onMount(async () => {
    try {
      const response = await fetch(
        "http://ec2-54-255-217-149.ap-southeast-1.compute.amazonaws.com:8000/api/user",
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

    if (auth) {
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
    }
  });
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

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

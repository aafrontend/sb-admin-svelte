<script>
  import Breadcrumb from "sveltestrap/src/Breadcrumb.svelte";
  import BreadcrumbItem from "sveltestrap/src/BreadcrumbItem.svelte";
  import Card from "sveltestrap/src/Card.svelte";
  import CardBody from "sveltestrap/src/CardBody.svelte";
  import CardHeader from "sveltestrap/src/CardHeader.svelte";
  import CardText from "sveltestrap/src/CardText.svelte";
  import CardSubtitle from "sveltestrap/src/CardSubtitle.svelte";
  import Row from "sveltestrap/src/Row.svelte";

  import DashboardCard from "../components/DashboardCard.svelte";
  import CustomCard from "../components/CustomCard.svelte";
  import Userstable from "../components/Userstable.svelte";
  import AreaChart from "../components/Charts/AreaChart.svelte";
  import BarChart from "../components/Charts/BarChart.svelte";
  import { onMount } from "svelte";

  let title = "SB Admin Svelte";

  // Test scripts:
  let totalCategories;
  let totalSubCategories;
  let totalQuestions;
  let totalUsers;

  // load data
  onMount(() => {
    fetch(`http://localhost:5000/api/user/users`, {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((data) => (totalUsers = data.length));

    fetch(`http://localhost:5000/api/quiz/categories`, {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((data) => (totalCategories = data.length));

    fetch(`http://localhost:5000/api/quiz/questions`, {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((data) => (totalQuestions = data.length));
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
    />
  </div>
  <div class="col-xl-3 col-md-6">
    <DashboardCard
      cardTitle="Total Sub-Categories"
      cardSubtitle={totalSubCategories}
      cardColor="dark"
    />
  </div>
  <div class="col-xl-3 col-md-6">
    <DashboardCard
      cardTitle="Total Questions"
      cardSubtitle={totalQuestions}
      cardColor="dark"
    />
  </div>
  <div class="col-xl-3 col-md-6">
    <DashboardCard
      cardTitle="Total Users"
      cardSubtitle={totalUsers}
      cardColor="dark"
    />
  </div>
</Row>
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
<CustomCard cardTitle="Registered Users" cardIcon="fas fa-table">
  <Userstable />
</CustomCard>

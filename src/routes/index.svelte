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
  import Table from "../components/Table.svelte";
  import AreaChart from "../components/Charts/AreaChart.svelte";
  import BarChart from "../components/Charts/BarChart.svelte";

  let title = "SB Admin Svelte";

  // Test scripts:
  let totalCategories = 21;
  let totalSubCategories = 1;
  let totalQuestions = 156;
  let totalUsers = 170;
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>
<h1 class="mt-4">Dashboard</h1>
<Breadcrumb class="mb-4">
  <BreadcrumbItem active>Dashboard</BreadcrumbItem>
</Breadcrumb>
<Row>
  <div class="col-xl-3 col-md-6">
    <DashboardCard
      cardTitle="Total Categories"
      cardSubtitle={totalCategories}
      cardColor="dark" />
  </div>
  <div class="col-xl-3 col-md-6">
    <DashboardCard
      cardTitle="Total Sub-Categories"
      cardSubtitle={totalSubCategories}
      cardColor="dark" />
  </div>
  <div class="col-xl-3 col-md-6">
    <DashboardCard
      cardTitle="Total Questions"
      cardSubtitle={totalQuestions}
      cardColor="dark" />
  </div>
  <div class="col-xl-3 col-md-6">
    <DashboardCard
      cardTitle="Total Users"
      cardSubtitle={totalUsers}
      cardColor="dark" />
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
<CustomCard cardTitle="DataTable Example" cardIcon="fas fa-table">
  <Table />
</CustomCard>

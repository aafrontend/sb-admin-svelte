<script>
  import Card from "sveltestrap/src/Card.svelte";
  import CardBody from "sveltestrap/src/CardBody.svelte";
  import CardFooter from "sveltestrap/src/CardFooter.svelte";
  import CardHeader from "sveltestrap/src/CardHeader.svelte";
  import CardText from "sveltestrap/src/CardText.svelte";
  import CardTitle from "sveltestrap/src/CardTitle.svelte";

  export let cardTitle = "";
  export let cardColor;
  export let cardFooterText = "View Details";
  export let cardSubtitle = "";
  export let path = "";
</script>

<Card inverse color={cardColor} class="mb-4">
  <CardHeader>
    <CardTitle>{cardTitle}</CardTitle>
  </CardHeader>
  <CardBody>
    <CardText>{cardSubtitle}</CardText>
  </CardBody>
  <CardFooter class="d-flex align-items-center justify-content-between">
    <a class="small text-white stretched-link" href={path}>
      {cardFooterText}
    </a>
    <div class="small text-white"><i class="fas fa-angle-right" /></div>
  </CardFooter>
</Card>

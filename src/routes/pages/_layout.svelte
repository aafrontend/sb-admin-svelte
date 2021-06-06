<script>
  import Row from "sveltestrap/src/Row.svelte";
  import Container from "sveltestrap/src/Container.svelte";

  import Footer from "../../components/Footer.svelte";

  //export let segment;
</script>

<div id="layoutAuthentication" class="bg-primary">
  <div id="layoutAuthentication_content">
    <main>
      <Container>
        <Row class="justify-content-center">
          <slot />
        </Row>
      </Container>
    </main>
  </div>
  <Footer />
</div>

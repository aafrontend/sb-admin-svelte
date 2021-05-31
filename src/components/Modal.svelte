<script>
  let shown = false;
  export function show() {
    shown = true;
  }
  export function hide() {
    shown = false;
  }
</script>

{#if shown}
  <div class="modal-wrapper" on:click={() => {}}>
    <div class="modal-content" on:click={() => {}}>
      <span class="close" on:click={() => hide()}>&times;</span>
      <slot />
    </div>
  </div>
{/if}

<style>
  .modal-wrapper {
    background-color: rgba(0, 0, 0, 0.6);
    position: fixed;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
  }
  .modal-content {
    background-color: white;
    max-width: 50%;
    padding: 1rem;
    margin: 15% auto;
  }
  .close {
    position: relative;
    left: 97%;
    top: 3%;
    cursor: pointer;
  }
  .close:hover {
    font-weight: bold;
  }
</style>

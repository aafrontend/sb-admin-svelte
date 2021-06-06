<script>
  import Card from "sveltestrap/src/Card.svelte";
  import CardBody from "sveltestrap/src/CardBody.svelte";
  import CardHeader from "sveltestrap/src/CardHeader.svelte";
  import Form from "sveltestrap/src/Form.svelte";
  import FormGroup from "sveltestrap/src/FormGroup.svelte";
  import Label from "sveltestrap/src/Label.svelte";
  import Input from "sveltestrap/src/Input.svelte";
  import { goto } from "@sapper/app";

  //init account

  let open = false;
  let fullscreen = "xl";

  let username = "";
  let password = "";

  const signIn = async () => {
    let resp;
    console.log({ username, password });
    await fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        name: username,
        password: password,
      }),
    })
      .then((res) => (resp = res))
      .catch((e) => console.log(e));

    if (resp.status === 400 || resp.status === 404 || resp.status === 401) {
      //console.log(resp);
      alert("Incorrect Username/Password");
    } else {
      await goto("/");
    }
  };

  function signInHandler() {
    if (
      username === null ||
      username.match(/^ *$/) !== null ||
      password === null ||
      password.match(/^ *$/) !== null
    ) {
      alert("Please fill in username/password!");
    } else {
      signIn();
    }
  }
</script>

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
            name="username"
            id="exampleEmail"
            bind:value={username}
            placeholder="Enter your username"
          />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword" class="small mb-1">Password</Label>
          <Input
            class="py-4"
            type="password"
            name="password"
            id="examplePassword"
            bind:value={password}
            placeholder="Enter password"
          />
        </FormGroup>
        <FormGroup
          class="d-flex align-items-center justify-content-between mt-4 mb-0"
        >
          <button color="primary" on:click|preventDefault={signInHandler}
            >Login</button
          >
        </FormGroup>
      </Form>
    </CardBody>
  </Card>
</div>

<script>
  import Card from "sveltestrap/src/Card.svelte";
  import CardBody from "sveltestrap/src/CardBody.svelte";
  import CardHeader from "sveltestrap/src/CardHeader.svelte";
  import CardFooter from "sveltestrap/src/CardFooter.svelte";
  import Form from "sveltestrap/src/Form.svelte";
  import FormGroup from "sveltestrap/src/FormGroup.svelte";
  import Label from "sveltestrap/src/Label.svelte";
  import Input from "sveltestrap/src/Input.svelte";
  import CustomInput from "sveltestrap/src/CustomInput.svelte";
  import Button from "sveltestrap/src/Button.svelte";
  import { goto } from "@sapper/app";
  import { onMount } from "svelte";
  import ModalBody from "sveltestrap/src/ModalBody.svelte";
  import ModalFooter from "sveltestrap/src/ModalFooter.svelte";
  import ModalHeader from "sveltestrap/src/ModalHeader.svelte";
  import Modal from "sveltestrap/src/Modal.svelte";
  import { userInfo } from "../../../userStore.js";

  //init account

  let open = false;
  let fullscreen = "xl";

  let authPromise;
  let userbase;

  let userObject = null;
  const unsubscribe = userInfo.subscribe((value) => {
    userObject = value;
  });

  let username = "admin";
  let password = "admin123";
  onMount(() => {
    userbase = window.userbase;
    authPromise = userbase
      .init({ appId: "4f0d866e-882d-4f53-88ee-2c3082abb3ff" })
      .then(({ user }) => userInfo.set(user));
    //signIn();
  });

  function signIn() {
    userbase.signIn({ username, password }).then((user) => {
      userInfo.set(user);
    });
    let transition = () => {
      goto("/");
    };
    for (let x = 0; x < 1000; x++) {
      if (x == 99) {
        transition();
      }
    }
  }

  const signUp = () => {
    userbase.signUp({ username, password });
    console.log("Signing up...");
  };

  function signInHandler() {
    if (
      username === null ||
      username.match(/^ *$/) !== null ||
      password === null ||
      password.match(/^ *$/) !== null
    ) {
      alert("Please fill in username/password!");
    } else if (username !== "admin" || password !== "admin123") {
      alert("Invalid Username or Password");
    } else {
      signIn();
      open = true;

      console.log("Signing in!");
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
    <!--<a class="small" href="pages/authentication/forget_password">
            Forgot Password?
          </a>
    <CardFooter class="text-center small">
          <a href="pages/authentication/register">Need an account? Sign up!</a>
        </CardFooter>

    -->
  </Card>
</div>

<Modal isOpen={open} {fullscreen}>
  <ModalHeader>Authenticating</ModalHeader>
  <ModalBody>Please wait...</ModalBody>
</Modal>

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

  //init account

  /*
  let userObject = null;
  const userbase = window.userbase;
  const appId = "4f0d866e-882d-4f53-88ee-2c3082abb3ff";
  let authPromise = userbase
    .init({ appId: "4f0d866e-882d-4f53-88ee-2c3082abb3ff" })
    .then(({ user }) => (userObject = user));

  const signIn = () => {
    authPromise = userbase
      .signIn({ username, password })
      .then((user) => (userObject = user));
    let redirect = async () => {
      if (userObject != null) {
        goto("../../");
      } else {
        alert("Invalid username or password");
      }
    };
    setTimeout(redirect, 6000);
  };

  const signOut = () =>
    (authPromise = userbase.signOut().then(() => (userObject = null)));
  */

  let username, password;
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
            placeholder="Enter email address"
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
          <Button color="primary" href=".">Login</Button>
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

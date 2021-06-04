<script>
  import Table from "sveltestrap/src/Table.svelte";
  import { Button } from "sveltestrap";
  import jQuery from "jquery";
  import { onMount, tick } from "svelte";
  import { load } from "../questiondata.js";
  import Modal from "sveltestrap/src/Modal.svelte";
  import ModalBody from "sveltestrap/src/ModalBody.svelte";
  import ModalFooter from "sveltestrap/src/ModalFooter.svelte";
  import ModalHeader from "sveltestrap/src/ModalHeader.svelte";
  import Form from "sveltestrap/src/Form.svelte";
  import FormGroup from "sveltestrap/src/FormGroup.svelte";
  import Label from "sveltestrap/src/Label.svelte";
  import Input from "sveltestrap/src/Input.svelte";

  let el; // table element
  let table; // table object (API)
  let categories = [];
  let modal;
  let question;
  let category;
  let level;
  let optionA;
  let optionB;
  let optionC;
  let optionD;
  let ans;
  let statsA;
  let statsB;
  let statsC;
  let statsD;
  let q_id;

  const dataPromise = load().catch((e) => {
    console.error(e);
  });
  onMount(() => {
    console.log(dataPromise);
    dataPromise.then(tick).then(() => {
      table = jQuery(el).DataTable();
    });

    fetch(
      `http://ec2-54-255-217-149.ap-southeast-1.compute.amazonaws.com:5000/api/quiz/categories/`,
      {
        method: "GET",
      }
    )
      .then((resp) => resp.json())
      .then((data) => (categories = data));
  });

  let open = false;
  let openDel = false;
  let size;
  const toggle = () => {
    size = "lg";
    if (!open && !openDel) {
      open = !open;
    } else if (open && !openDel) {
      open = !open;
    } else if (!open && openDel) {
      openDel = !openDel;
    } else {
      // do nothing
    }
  };
  const toggleDel = () => {
    size = "lg";
    openDel = !openDel;
  };

  function clickHandler(row) {
    question = row.question;
    category = row.category;
    level = row.difficulty;
    optionA = row.option_a;
    optionB = row.option_b;
    optionC = row.option_c;
    optionD = row.option_d;
    ans = row.answer;
    statsA = row.stats_a;
    statsB = row.stats_b;
    statsC = row.stats_c;
    statsD = row.stats_d;
    q_id = row.q_id;

    toggle();
  }

  function delClickHandler(row) {
    question = row.question;
    category = row.category;
    level = row.difficulty;
    optionA = row.option_a;
    optionB = row.option_b;
    optionC = row.option_c;
    optionD = row.option_d;
    ans = row.answer;
    statsA = row.stats_a;
    statsB = row.stats_b;
    statsC = row.stats_c;
    statsD = row.stats_d;
    q_id = row.q_id;

    toggleDel();
  }

  function editQuestion() {
    let id = q_id;

    let data = {
      category: category,
      difficulty: level,
      question: question,
      option_a: optionA,
      option_b: optionB,
      option_c: optionC,
      option_d: optionD,
      answer: ans,
      stats_a: statsA,
      stats_b: statsB,
      stats_c: statsC,
      stats_d: statsD,
    };

    console.log(JSON.stringify(data));

    if (
      category == "" ||
      level == "" ||
      question == "" ||
      optionA == "" ||
      optionB == "" ||
      optionC == "" ||
      optionD == "" ||
      ans == ""
    ) {
      alert("Please fill in the fields");
    } else {
      fetch(`http://localhost:5000/api/quiz/questions/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((resp) => resp.json());
      alert("Changes saved successfully!");
      toggle();
      location.reload();
    }
  }

  function deleteQuestion() {
    let id = q_id;

    let data = {
      category: category,
      difficulty: level,
      question: question,
      option_a: optionA,
      option_b: optionB,
      option_c: optionC,
      option_d: optionD,
      answer: ans,
      stats_a: statsA,
      stats_b: statsB,
      stats_c: statsC,
      stats_d: statsD,
    };

    console.log(JSON.stringify(data));

    fetch(
      `http://ec2-54-255-217-149.ap-southeast-1.compute.amazonaws.com:5000/api/quiz/questions/${id}`,
      {
        method: "DELETE",
      }
    ).then((resp) => resp.json());
    alert("Question deleted successfully!");
    toggleDel();
    location.reload();
  }
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="//cdn.datatables.net/1.10.21/css/jquery.dataTables.min.css"
  />
</svelte:head>

<table bind:this={el} class="display" style="width:100%">
  <thead>
    <tr>
      <th>ID</th>
      <th>Question</th>
      <th>Category</th>
      <th>Level</th>
      <th>Option A</th>
      <th>Option B</th>
      <th>Option C</th>
      <th>Option D</th>
      <th>Answer</th>

      <th style="width:110px">Action</th>
    </tr>
  </thead>
  <tbody>
    {#await dataPromise then rows}
      {#each rows as row}
        <tr>
          <td>{row.q_id}</td>
          <td>{row.question}</td>
          <td>{row.category}</td>
          <td>{row.difficulty}</td>
          <td>{row.option_a}</td>
          <td>{row.option_b}</td>
          <td>{row.option_c}</td>
          <td>{row.option_d}</td>
          <td>{row.answer}</td>

          <td>
            <Button size="sm" color="info" on:click={() => clickHandler(row)}
              >edit</Button
            >
            <Button
              size="sm"
              color="danger"
              on:click={() => delClickHandler(row)}>delete</Button
            >
          </td>
        </tr>
      {/each}
    {/await}
  </tbody>
</table>

<Modal isOpen={open} {toggle} {size}>
  <ModalHeader {toggle}>Edit Question</ModalHeader>
  <ModalBody>
    <Form>
      <Label for="exampleSelect" class="small mb-1">Category</Label>
      <select bind:value={category}>
        <option value="none" selected disabled hidden>Choose a Category</option>

        {#each categories as cat}
          <option value={cat.category}>{cat.category}</option>
        {/each}
      </select>

      <FormGroup>
        <Label for="exampleQuestion" class="small mb-1">Question</Label>
        <Input
          class="py-4"
          type="text"
          name="text"
          id="question"
          bind:value={question}
        />
      </FormGroup>

      <FormGroup>
        <Label for="exampleLevel" class="small mb-1">Level</Label>
        <Input
          class="py-4"
          type="text"
          name="text"
          id="categoryLevel"
          placeholder="Level"
          bind:value={level}
        />
      </FormGroup>

      <FormGroup>
        <Label for="exampleOptionA" class="small mb-1">Option A</Label>
        <Input
          class="py-4"
          type="text"
          name="text"
          id="Option A"
          bind:value={optionA}
        />
      </FormGroup>
      <FormGroup>
        <Label for="exampleOptionB" class="small mb-1">Option B</Label>
        <Input
          class="py-4"
          type="text"
          name="text"
          id="Option B"
          bind:value={optionB}
        />
      </FormGroup>
      <FormGroup>
        <Label for="exampleOptionC" class="small mb-1">Option C</Label>
        <Input
          class="py-4"
          type="text"
          name="text"
          id="Option C"
          bind:value={optionC}
        />
      </FormGroup>
      <FormGroup>
        <Label for="exampleOptionD" class="small mb-1">Option D</Label>
        <Input
          class="py-4"
          type="text"
          name="text"
          id="Option D"
          bind:value={optionD}
        />
      </FormGroup>

      <FormGroup>
        <Label for="answer" class="small mb-1">Correct Answer</Label>
        <select bind:value={ans}>
          <option selected disabled hidden>Select Right Answer</option>
          <option value="a">A</option>
          <option value="b">B</option>
          <option value="c">C</option>
          <option value="d">D</option>
        </select>
      </FormGroup>
    </Form>
  </ModalBody>
  <ModalFooter>
    <Button block color="primary" size="sm" on:click={() => editQuestion()}
      >Confirm Changes</Button
    >
  </ModalFooter>
</Modal>

<Modal isOpen={openDel} {toggle} {size}>
  <ModalHeader {toggle}>Delete Question</ModalHeader>
  <ModalBody>
    <Form>
      <FormGroup>
        <Label for="exampleQuestion" class="small mb-1">Category</Label>
        <Input
          class="py-4"
          type="text"
          name="text"
          id="question"
          disabled
          bind:value={category}
        />
      </FormGroup>

      <FormGroup>
        <Label for="exampleQuestion" class="small mb-1">Question</Label>
        <Input
          class="py-4"
          type="text"
          name="text"
          id="question"
          disabled
          bind:value={question}
        />
      </FormGroup>

      <FormGroup>
        <Label for="exampleLevel" class="small mb-1">Level</Label>
        <Input
          class="py-4"
          type="text"
          name="text"
          id="categoryLevel"
          placeholder="Level"
          disabled
          bind:value={level}
        />
      </FormGroup>

      <FormGroup>
        <Label for="exampleOptionA" class="small mb-1">Option A</Label>
        <Input
          class="py-4"
          type="text"
          name="text"
          id="Option A"
          disabled
          bind:value={optionA}
        />
      </FormGroup>
      <FormGroup>
        <Label for="exampleOptionB" class="small mb-1">Option B</Label>
        <Input
          class="py-4"
          type="text"
          name="text"
          id="Option B"
          disabled
          bind:value={optionB}
        />
      </FormGroup>
      <FormGroup>
        <Label for="exampleOptionC" class="small mb-1">Option C</Label>
        <Input
          class="py-4"
          type="text"
          name="text"
          id="Option C"
          disabled
          bind:value={optionC}
        />
      </FormGroup>
      <FormGroup>
        <Label for="exampleOptionD" class="small mb-1">Option D</Label>
        <Input
          class="py-4"
          type="text"
          name="text"
          id="Option D"
          disabled
          bind:value={optionD}
        />
      </FormGroup>

      <FormGroup>
        <Label for="exampleOptionD" class="small mb-1">Correct Answer</Label>
        <Input
          class="py-4"
          type="text"
          name="text"
          id="answer"
          disabled
          bind:value={ans}
        />
      </FormGroup>
    </Form>
  </ModalBody>
  <ModalFooter>
    <Button block color="primary" size="sm" on:click={() => deleteQuestion()}
      >Confirm Changes</Button
    >
  </ModalFooter>
</Modal>

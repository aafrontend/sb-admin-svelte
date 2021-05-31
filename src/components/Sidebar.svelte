<script>
  import Collapse from "sveltestrap/src/Collapse.svelte";
  import Nav from "sveltestrap/src/Nav.svelte";

  import SidebarItem from "./SidebarItem.svelte";

  export let segment;
  export let theme;

  $: sidenav_theme = `sb-sidenav-${theme}`;

  let isLayoutOpen = false;
  let isSettingOpen = false;
  let isPageOpen = false;
  let isAuthenticationOpen = false;
  let isErrorOpen = false;
  let activeLink = "Dashboard";
  let footerName = "SB Admin Svelte";
  let footerText = "Logged in as:";

  const updateActiveLink = (linkName) => (activeLink = linkName);

  const toggleLayout = () => {
    isLayoutOpen = !isLayoutOpen;
    if (isPageOpen === true) isPageOpen = false;
  };

  const toggleSetting = () => {
    isSettingOpen = !isSettingOpen;
    if (isPageOpen === true) isPageOpen = false;
  };

  const togglePages = () => {
    isPageOpen = !isPageOpen;
    if (isLayoutOpen === true) isLayoutOpen = false;
    if (isPageOpen === false) {
      isAuthenticationOpen = false;
      isErrorOpen = false;
    }
  };

  const toggleAuthentication = () => {
    isAuthenticationOpen = !isAuthenticationOpen;
    if (isErrorOpen === true) isErrorOpen = false;
  };

  const toggleError = () => {
    isErrorOpen = !isErrorOpen;
    if (isAuthenticationOpen === true) isAuthenticationOpen = false;
  };
</script>

<div id="layoutSidenav_nav" class="sb-nav-fixed">
  <Nav
    class="sb-sidenav {sidenav_theme} accordion sb-nav-fixed"
    id="sidenavAccordion"
  >
    <div class="sb-sidenav-menu">
      <Nav>
        <div class="sb-sidenav-menu-heading">Home</div>
        <SidebarItem
          on:press={() => {
            theme = "dark";
          }}
          text="Dashboard"
          class={segment === "." || segment === undefined ? "active" : ""}
          leftIcon
          href="."
        >
          <i class="fas fa-tachometer-alt" slot="leftIcon" />
        </SidebarItem>

        <div class="sb-sidenav-menu-heading">Users</div>
        <SidebarItem
          class={segment === "users" ? "active" : ""}
          on:press={() => {
            theme = "dark";
          }}
          href="users"
          text="Registered Users"
          leftIcon
        >
          <i class="fas fa-users" slot="leftIcon" />
        </SidebarItem>

        <div class="sb-sidenav-menu-heading">Quiz</div>
        <SidebarItem
          class={segment === "categories" ? "active" : ""}
          on:press={() => {
            theme = "dark";
          }}
          href="categories"
          text="Categories"
          leftIcon
        >
          <i class="fas fa-book" slot="leftIcon" />
        </SidebarItem>
        <SidebarItem
          class={segment === "questions" ? "active" : ""}
          on:press={() => {
            theme = "dark";
          }}
          href="questions"
          text="Questions"
          leftIcon
        >
          <i class="fas fa-trophy" slot="leftIcon" />
        </SidebarItem>
        <SidebarItem
          class={segment === "questionsreports" ? "active" : ""}
          on:press={() => {
            theme = "dark";
          }}
          href="questionsreports"
          text="Questions Reports"
          leftIcon
        >
          <i class="fas fa-question-circle" slot="leftIcon" />
        </SidebarItem>

        <div class="sb-sidenav-menu-heading">Actions</div>
        <SidebarItem
          class={segment === "notifications" ? "active" : ""}
          on:press={() => {
            theme = "dark";
          }}
          href="notifications"
          text="Send Notifications"
          leftIcon
        >
          <i class="fas fa-bullhorn" slot="leftIcon" />
        </SidebarItem>
        <SidebarItem
          class={segment === "importquestions" ? "active" : ""}
          on:press={() => {
            theme = "dark";
          }}
          href="importquestions"
          text="Import Questions"
          leftIcon
        >
          <i class="fas fa-download" slot="leftIcon" />
        </SidebarItem>
        <SidebarItem
          class={segment === "adminusers" ? "active" : ""}
          on:press={() => {
            theme = "dark";
          }}
          href="adminusers"
          text="Admin Accounts"
          leftIcon
        >
          <i class="fas fa-user" slot="leftIcon" />
        </SidebarItem>

        <div class="sb-sidenav-menu-heading">Settings</div>
        <SidebarItem
          on:press={toggleSetting}
          class={!isSettingOpen ? "collapsed" : ""}
          text="Settings"
          leftIcon
          rightIcon
        >
          <i class="fas fa-cog" slot="leftIcon" />
          <i class="fas fa-angle-down" slot="rightIcon" />
        </SidebarItem>
        <Collapse isOpen={isSettingOpen}>
          <Nav class="sb-sidenav-menu-nested">
            <SidebarItem
              on:press={() => {
                theme = "dark";
                updateActiveLink("Notification Settings");
              }}
              class={segment === "settings" &&
              activeLink === "Notification Settings"
                ? "active"
                : ""}
              href="settings/notificationsettings"
              text="Notification Settings"
            />
            <SidebarItem
              on:press={() => {
                theme = "dark";
                updateActiveLink("Privacy Policy");
              }}
              class={segment === "settings" && activeLink === "Privacy Policy"
                ? "active"
                : ""}
              href="settings/privacypolicy"
              text="Privacy Policy"
            />
            <SidebarItem
              on:press={() => {
                theme = "dark";
                updateActiveLink("Terms and Conditions");
              }}
              class={segment === "settings" &&
              activeLink === "Terms and Conditions"
                ? "active"
                : ""}
              href="settings/termsandconditions"
              text="Terms and Conditions"
            />
          </Nav>
        </Collapse>
      </Nav>
    </div>
    <div class="sb-sidenav-footer">
      <div class="small">{footerText}</div>
      {footerName}
    </div>
  </Nav>
</div>

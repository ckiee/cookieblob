<script>
    import Home from "./routes/Home.svelte";
    import { Router, Link, Route } from "svelte-routing";
</script>

<style>

</style>

<main class="h-screen bg-darker text-white">
    <Router url={window.location.pathname}>
        <!-- <nav>
      <Link to="/" class="text-link">Home</Link>
    </nav> -->
        <Route path="/" component={Home} />
    </Router>
</main>

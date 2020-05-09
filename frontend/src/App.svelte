<script>
    import Home from "./routes/Home.svelte";
    import NotFound from "./routes/NotFound.svelte";
    import Nav from "./routes/Nav.svelte";

    import { Router, Link, Route, link } from "svelte-routing";
    if (window.location.pathname == "/") {
    }
</script>

<style>

</style>

<main class="bg-darker text-white">
    <Router url={false}>
        <div class="h-screen flex flex-col container mx-auto">
            <Nav />
            <!-- Routes -->
            <Route path="/" component={Home} />
            <Route path="*" component={NotFound} />
        </div>
    </Router>
</main>

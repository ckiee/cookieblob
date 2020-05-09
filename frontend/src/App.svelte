<script>
    import Home from "./routes/Home.svelte";
    import NotFound from "./routes/NotFound.svelte";
    import Nav from "./routes/Nav.svelte";
    import { Route } from "tinro";
    if (window.location.pathname == "/") {
    }
</script>

<style>

</style>

<main class="bg-darker text-white">
    <div class="h-screen flex flex-col container mx-auto">
        <Nav />
        <!-- Routes -->
        <Route>
            <Route path="/">
                <Home />
            </Route>

            <Route fallback>
                <NotFound />
            </Route>
        </Route>
    </div>
</main>

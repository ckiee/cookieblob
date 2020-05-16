<script>
    import Home from "./routes/Home.svelte";
    import NotFound from "./routes/NotFound.svelte";
    import Nav from "./routes/Nav.svelte";
    import Dashboard from "./routes/Dashboard.svelte";
    import { Route } from "tinro";
    import { user } from "./stores";
</script>

<style>

</style>

<main class="bg-nqbl text-white">
    <div class="h-screen flex flex-col container mx-auto">
        <Nav />
        <!-- Routes -->
        <Route>
            {#if $user}
                <Route path="/" redirect="/dashboard" />
                <Route path="/dashboard/*">
                    <Dashboard />
                </Route>
            {:else}
                <Route path="/dashboard/*" redirect="/" />
                <Route path="/">
                    <Home />
                </Route>
            {/if}

            <Route fallback>
                <NotFound />
            </Route>
        </Route>
    </div>
</main>

<script>
    import { Link, link } from "svelte-routing";
</script>

<nav class="flex gap-10 items-center">
    <a href="/" use:link class="flex items-center gap-2">
        <img src="/assets/ablobnomcookie.gif" alt="blob eats cookie" />
        <p class="text-xl">Cookieblob</p>
    </a>
    <Link to="/dashboard">Dashboard</Link>
</nav>

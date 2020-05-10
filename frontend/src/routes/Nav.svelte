<script>
    import { user, logOut } from "../stores";
</script>

<div class="flex content-between">

    <div class="flex gap-10 items-center w-full">
        <a href="/" class="flex items-center gap-2">
            <img
                src="/assets/ablobnomcookie.gif"
                alt="animated blob nom cookie" />
            <p class="text-xl">Cookieblob</p>
        </a>
        <a href="/dashboard">Dashboard</a>

    </div>
    {#if $user}
        <div class="flex gap-10 items-center justify-end w-full">
            <a href="#" on:click={logOut}>Log out</a>
            <img
                class="rounded-full"
                src="https://cdn.discordapp.com/avatars/{$user._id}/{$user.avatar}.png?size=64"
                alt="User Avatar" />
        </div>
    {/if}
</div>

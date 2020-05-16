<script>
    import { Route, active } from "tinro";
    import Starboard from "./dash/Starboard.svelte";
    import NotFound from "./NotFound.svelte";
</script>

<div class="flex pt-5">
    <div class="flex flex-col flex-shrink pr-5">
        <!-- TOOD: swithc to hypesquad clr -->
        <a
            class="flex text-blpl items-center "
            use:active
            active-class="font-semibold"
            href="/dashboard">
            <svg class="w-10" fill="currentColor" viewBox="0 0 20 20">
                <path
                    d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102
                    0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0
                    000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0
                    011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0
                    010-3.464V4a1 1 0 011-1z" />
            </svg>
            <p class="text-lg">Dashboard</p>
        </a>
        <a
            class="flex text-hpsq items-center"
            use:active
            active-class="font-semibold"
            href="/dashboard/starboard">
            <svg class="w-10" fill="currentColor" viewBox="0 0 20 20">
                <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0
                    00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0
                    00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54
                    1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8
                    2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0
                    00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1
                    1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <p class="text-lg">Starboard</p>
        </a>
    </div>
    <div>
        <Route path="/starboard">
            <Starboard />
        </Route>
        <Route fallback>
            <NotFound />
        </Route>
    </div>
</div>

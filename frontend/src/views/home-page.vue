<template>
    <section class="home">
        <div class="hero-container flex">
            <div class="hero-title flex">
                <h1>Putting the pieces together can be rewarding. Cardella is here to help lead your team on the path to success! </h1>
                <router-link class="link flex" to="/board/5fc4ba9114c9a871c81fe2bb"
                    ><h4>Let's Get Started</h4></router-link
                >
            </div>
            <img
                flex
                src="https://res.cloudinary.com/shimrit/image/upload/v1606990002/cardella/9814_szxc5a.jpg"
            />
        </div>
        <div class="main-container flex">
            <div class="couple flex">
                <div class="text">
                    <h2 class="title">Working together is easy!</h2>
                    <p class="desc">
                       Who said teamwork can't be fun? With Cardella it is simple to organize your
                        project, keep together in progress, and achieve more. 
                    </p>
                </div>
                <img
                    src="https://res.cloudinary.com/shimrit/image/upload/v1606993715/cardella/5ead1b0f-648e-4dd0-9141-f93d3937ae4d_inlnte.jpg"
                />
            </div>
            <div class="couple flex">
                <div class="text">
                    <h2 class="title">Cardella loves cards!</h2>
                    <p class="desc">
                        You can post, edit, choose labels, add members,
                        additional task descriptions, and check-lists. A card
                        can be moved, copied, saved, deleted and added
                        attachments.
                    </p>
                </div>
                <img
                    src="https://res.cloudinary.com/shimrit/image/upload/v1606997140/cardella/a36f23e8-dbaf-4d2a-adf4-3087acff22bd_uro36a.jpg"
                />
            </div>
            <div class="couple flex">
                <div class="text">
                    <h2 class="title">Just like stickers...</h2>
                    <p class="desc">
                        Drag and drop a selected card or even an entire list in order to re-arrange
                        tasks.
                    </p>
                </div>
                <img
                    src="https://res.cloudinary.com/shimrit/image/upload/v1606997799/cardella/e3a838ef-60ee-4b94-8377-2df85b4efabc_krcvry.jpg"
                />
            </div>
        </div>
        <app-footer />
    </section>
</template>
<script>
import appFooter from "@/cmps/app-footer.cmp.vue";

export default {
    name: "home-page",
    components: {
        appFooter,
    },
};
</script>

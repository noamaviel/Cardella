<template>
    <section class="home">
        <div class="hero-container flex">
            <div class="hero-title flex">
                <img
                    class="logo"
                    src="https://res.cloudinary.com/morshva/image/upload/v1607179956/logo-black_bl4s9d.png"
                />
                <h1>
                    Putting the pieces together can be truly rewarding. Cardella
                    is here to help lead your team on the path to success!
                </h1>
                <router-link
                    class="link flex"
                    to="/board/5fca2d38e4167fe6dfcfbec5"
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
                        Who says teamwork can't be fun? With Cardella it is
                        simple to organize your project, keep together in
                        progress, and achieve more.
                    </p>
                </div>
                <img
                    src="https://res.cloudinary.com/morshva/image/upload/v1607178261/1_hlgyzw.png"
                />
            </div>
            <div class="couple flex">
                <div class="text">
                    <h2 class="title">Cardella loves cards!</h2>
                    <p class="desc">
                        You can post, edit, choose labels, and add check-lists.
                        Cardella's cards can do just about everything! Move
                        them, copy, save, delete and add any photo you like.
                    </p>
                </div>
                <img
                    src="https://res.cloudinary.com/morshva/image/upload/v1607178261/2_wsibtx.png"
                />
            </div>
            <div class="couple flex">
                <div class="text">
                    <h2 class="title">Just like stickers...</h2>
                    <p class="desc">
                        Drag and drop a selected card or even an entire list in
                        order to re-arrange your assignments.
                    </p>
                </div>
                <img
                    src="https://res.cloudinary.com/morshva/image/upload/v1607178261/3_oyfdys.png"
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

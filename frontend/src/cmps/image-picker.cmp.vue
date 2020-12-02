<template>
    <section class="image-picker">
        <img
            v-for="(imgUrl, idx) in imgUrls"
            :src="imgUrl"
            :key="idx"
            @click="selectImage"
        />
    </section>
</template>

<script>
export default {
    data() {
        return {
            selectedImgUrl: "",
            imgUrls: [
                "https://res.cloudinary.com/morshva/image/upload/v1606573776/7_op2qhx.jpg",
                "https://res.cloudinary.com/morshva/image/upload/v1606572977/2_hbkchm.jpg",
                "https://res.cloudinary.com/morshva/image/upload/v1606573383/5_mavwxz.jpg",
                "https://res.cloudinary.com/morshva/image/upload/v1606572976/3_ye915h.jpg",
            ],
        };
    },
    methods: {
        selectImage(imgUrl) {
            this.selectedImgUrl = imgUrl.target.src;
            this.$emit("setBackgroundImg", this.selectedImgUrl);
        },
    },
};
</script>

<style>
</style>
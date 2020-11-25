<template>
    <section class="card-preview-container" style="display:inline-block; padding:10px; margin:5px; border:1px solid black; width:200px; height:400px">
        <h1>card</h1>
        {{card.title}}
    </section>
</template>

<script>
export default {
    props:['card']
}
</script>

<style>

</style>
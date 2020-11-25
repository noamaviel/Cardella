
<template>
  <section class="list-container">
    <h1>list</h1>
    <card-preview v-for="card in cards" :key="card.id" :card="card" />
  </section>
</template>

<script>
import cardPreview from "../card/card-preview.cmp";
export default {
  data() {  
    return {
      cards: [   //temp
        {
          id: "c101",
          title: "Write something smart",
          fullName: "Guest",
          imgUrl: "https://www.google.com",
          description: "description",
          comments: [
            {
              txt: "a comment",
              id: "ZdPnm",
              createdAt: 1590999817436.0,
              createdBy: {
                _id: "u101",
                username: "mor",
                fullname: "Mor Lev Ari",
                imgUrl: "http://some-img",
              },
            },
          ],

          checklists: [
            {
              id: "YEhmF",
              title: "Checklist",
              todos: [
                {
                  id: "212jX",
                  title: "To Do 1",
                  isDone: false,
                },
              ],
            },
          ],
          members: [
            {
              _id: "u101",
              fullName: "Mor Lev Ari",
              imgUrl: "http://some-img",
            },
          ],

          labels: [
            {
              id: "101",
              title: "Fun",
              color: "#61bd4f",
            },
            {
              id: "102",
              title: "High",
              color: "#61bd4f",
            },
            {
              id: "103",
              title: "Low",
              color: "#61bd4f",
            },
          ],

          createdAt: 1590999730348,
          dueDate: 16156215211,
          createdBy: {
            _id: "u101",
            username: "mor",
            fullname: "Mor Lev Ari",
            imgUrl: "http://some-img",
          },
        },
        {
          id: "c102",
          title: "Write another something smart",
          fullName: "Guest",
          imgUrl: "https://www.google.com",
          description: "description",
          comments: [
            {
              txt: "a comment",
              id: "ZdPnm",
              createdAt: 1590999817436.0,
              createdBy: {
                _id: "u101",
                username: "mor",
                fullname: "Mor Lev Ari",
                imgUrl: "http://some-img",
              },
            },
          ],

          checklists: [
            {
              id: "YEhmF",
              title: "Checklist",
              todos: [
                {
                  id: "212jX",
                  title: "To Do 1",
                  isDone: false,
                },
              ],
            },
          ],
          members: [
            {
              _id: "u101",
              fullName: "Mor Lev Ari",
              imgUrl: "http://some-img",
            },
          ],

          labels: [
            {
              id: "101",
              title: "Fun",
              color: "#61bd4f",
            },
            {
              id: "102",
              title: "High",
              color: "#61bd4f",
            },
            {
              id: "103",
              title: "Low",
              color: "#61bd4f",
            },
          ],

          createdAt: 1590999730348,
          dueDate: 16156215211,
          createdBy: {
            _id: "u101",
            username: "mor",
            fullname: "Mor Lev Ari",
            imgUrl: "http://some-img",
          },
        },
      ],
    };
  },
  components: {
    cardPreview,
  },
};
</script>

<style>
</style>
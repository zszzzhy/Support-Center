<template>
  <div class="tickets" id="tickets">
    <Loading v-if="remoteDataBusy"/>

    <div class="empty" v-else-if="tickets.length === 0">You don't have any ticket yet.</div>

    <section class="tickets-list" v-else>
      <div class="ticket-item" v-for="ticket of tickets">
        <router-link :to="{name: 'ticket', params: { id: ticket._id}}">{{ ticket.title }}</router-link>
        <span class="badge">{{ ticket.status }}</span>
        <span class="date">{{ ticket.date | date }}</span>
      </div>
    </section>
  </div>
</template>


<script>
import RemoteData from "../mixins/RemoteData";

export default {
  mixins: [
    RemoteData({
      tickets: "tickets"
    })
  ]
};
</script>
